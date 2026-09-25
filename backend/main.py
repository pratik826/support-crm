import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

from backend.database import engine, Base, SessionLocal
from backend import models, schemas


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(title="Support CRM API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL", "http://localhost:5173")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "Support CRM API is running!"}


@app.post("/api/tickets")
def create_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):

    # Create a ticket with a temporary unique ID
    import uuid

    new_ticket = models.Ticket(
        ticket_id=f"TEMP-{uuid.uuid4().hex}",
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    # Save the ticket to generate its database ID
    db.add(new_ticket)
    db.flush()

    # Generate the public ticket ID
    new_ticket.ticket_id = f"TKT-{new_ticket.id:03d}"

    db.commit()
    db.refresh(new_ticket)

    return {
        "ticket_id": new_ticket.ticket_id,
        "created_at": new_ticket.created_at
    }

@app.get("/api/tickets")
def get_tickets(
    status: str = None,
    search: str = None,
    customer_email: str = None,
    db: Session = Depends(get_db)
):

    query = db.query(models.Ticket)

    if customer_email:
        query = query.filter(
            models.Ticket.customer_email.ilike(customer_email.strip())
        )

    # Filter by status
    if status:
        query = query.filter(models.Ticket.status.ilike(status))

    # Search across ticket ID, customer name, email, and description
    if search:
        search_term = f"%{search}%"

        query = query.filter(
            (models.Ticket.ticket_id.ilike(search_term)) |
            (models.Ticket.customer_name.ilike(search_term)) |
            (models.Ticket.customer_email.ilike(search_term)) |
            (models.Ticket.subject.ilike(search_term)) |
            (models.Ticket.description.ilike(search_term))
        )

    tickets = query.all()

    return tickets

@app.get("/api/tickets/{ticket_id}")
def get_ticket(
    ticket_id: str,
    customer_email: str = None,
    db: Session = Depends(get_db)
):

    ticket_id = ticket_id.strip()

    ticket = (
        db.query(models.Ticket)
        .filter(models.Ticket.ticket_id.ilike(ticket_id))
        .first()
    )

    if not ticket:
        return {"error": "Ticket not found"}

    if customer_email:
        if ticket.customer_email.lower() != customer_email.strip().lower():
            return {"error": "You are not authorized to view this ticket"}

    return {
        "ticket_id": ticket.ticket_id,
        "customer_name": ticket.customer_name,
        "customer_email": ticket.customer_email,
        "subject": ticket.subject,
        "description": ticket.description,
        "status": ticket.status,
        "created_at": ticket.created_at,
        "updated_at": ticket.updated_at,
        "notes": [
            {
                "id": note.id,
                "note_text": note.note_text,
                "created_at": note.created_at
            }
            for note in ticket.notes
        ]
    }

@app.put("/api/tickets/{ticket_id}")
def update_ticket(
    ticket_id: str,
    ticket: schemas.TicketUpdate,
    customer_email: str = None,
    db: Session = Depends(get_db)
):
    
    ticket_id = ticket_id.strip()
    # Find the ticket
    existing_ticket = (
        db.query(models.Ticket)
        .filter(models.Ticket.ticket_id.ilike(ticket_id))
        .first()
    )

    # If ticket does not exist
    if not existing_ticket:
        return {"error": "Ticket not found"}

    if customer_email:
        if existing_ticket.customer_email.lower() != customer_email.strip().lower():
            return {"error": "You are not authorized to update this ticket"}

    # Update the status
    existing_ticket.status = ticket.status

    # Add a note if one was provided
    if ticket.notes:
        new_note = models.Note(
            ticket_id=existing_ticket.id,
            note_text=ticket.notes,
            created_at=datetime.utcnow()
        )

        db.add(new_note)

    # Save changes
    db.commit()
    db.refresh(existing_ticket)

    return {
        "success": True,
        "updated_at": existing_ticket.updated_at
    }