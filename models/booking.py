from pydantic import BaseModel

class Booking(BaseModel):
    name: str
    email: str
    phone: str
    eventType: str
    eventDate: str
    guestCount: int
    budget: str = None
    message: str = None
