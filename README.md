# Support CRM System

A full-stack Customer Support Ticketing CRM built with React, FastAPI, and SQLite.

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
└── README.md



Local Setup
1. Clone the repository
git clone <repository-url>
cd Support-CRM
2. Backend Setup
cd backend
python -m venv .venv

Activate the virtual environment on Windows:

.venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Start the backend:

uvicorn backend.main:app --reload

Backend will run at:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs
3. Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

Frontend will run at:

http://localhost:5173
Environment Variables

Environment variable examples are provided in .env.example.

Actual .env files should not be committed to GitHub.

API Endpoints
Method	Endpoint	Purpose
POST	/api/tickets	Create a ticket
GET	/api/tickets	Get/search/filter tickets
GET	/api/tickets/{ticket_id}	View ticket details
PUT	/api/tickets/{ticket_id}	Update status and add notes
Running the Application

Run both services simultaneously:

Frontend → http://localhost:5173
Backend  → http://127.0.0.1:8000

The React frontend communicates with the FastAPI backend through REST APIs.

Deployment

The backend and frontend can be deployed as separate services using Railway.

Production environment variables should be configured in the deployment platform rather than committed to the repository.

Assignment

This project was developed as a Customer Support Ticketing CRM System as part of a technical assessment.