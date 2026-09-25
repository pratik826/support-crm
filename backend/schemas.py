from pydantic import BaseModel, field_validator


class TicketCreate(BaseModel):
    customer_name: str
    customer_email: str
    subject: str
    description: str


class TicketUpdate(BaseModel):
    status: str
    notes: str | None = None

    @field_validator("status")
    @classmethod
    def validate_status(cls, value):
        status_map = {
            "open": "Open",
            "in progress": "In Progress",
            "closed": "Closed"
        }

        normalized = value.strip().lower()

        if normalized not in status_map:
            raise ValueError("Status must be Open, In Progress, or Closed")

        return status_map[normalized]