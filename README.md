# Support CRM System

A full-stack Customer Support Ticketing CRM built with React, FastAPI, SQLAlchemy, and SQLite.

## Live Application

**Frontend:**  
https://hopeful-determination-production-f89b.up.railway.app

**Backend API:**  
https://support-crm-production-7b86.up.railway.app

**API Documentation:**  
https://support-crm-production-7b86.up.railway.app/docs

## Tech Stack

- Frontend: React + Vite + Bootstrap
- Backend: FastAPI
- Database: SQLite
- ORM: SQLAlchemy
- API: REST API
- Deployment: Railway

## Features

- Employee and Customer roles
- Create support tickets
- Automatic ticket ID generation
- Customer ticket tracking
- Search tickets
- Filter tickets by status
- View complete ticket details
- Update ticket status
- Add notes/comments
- Customer-specific ticket access
- Responsive design
- Automatic ticket refresh
- Persistent database storage

## Project Structure

```text
Support-CRM/
├── backend/
│   ├── __init__.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   ├── package.json
│   └── vite.config.js
│
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md

Local Setup

1. Clone the Repository
git clone https://github.com/pratik826/support-crm.git
cd support-crm


2. Backend Setup
Create and activate a virtual environment:

python -m venv backend/.venv

On Windows:

backend\.venv\Scripts\activate

Install backend dependencies:

pip install -r backend/requirements.txt

Start the backend from the project root:

uvicorn backend.main:app --reload

Backend will run at:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs


3. Frontend Setup
Open another terminal from the project root:

cd frontend
npm install
npm run dev

Frontend will run at:

http://localhost:5173


Environment Variables
Environment variable examples are provided in .env.example.

Actual .env files should not be committed to GitHub.

For local development, the frontend API URL can be configured using:

VITE_API_URL=http://127.0.0.1:8000/api



API Endpoints
Method	       Endpoint	                    Purpose
POST	       /api/tickets	                Create a ticket
GET	           /api/tickets	                Get, search, and filter tickets
GET	           /api/tickets/{ticket_id}	    View ticket details
PUT	           /api/tickets/{ticket_id}	    Update status and add notes



Running the Application
Run both services simultaneously:

Frontend → http://localhost:5173
Backend  → http://127.0.0.1:8000

The React frontend communicates with the FastAPI backend through REST APIs.


Deployment
The frontend and backend are deployed as separate services using Railway.
Production environment variables are configured in Railway rather than committed to the repository.
The backend uses persistent SQLite storage through a Railway volume.


Assignment
This project was developed as a Customer Support Ticketing CRM System as part of a technical assessment.