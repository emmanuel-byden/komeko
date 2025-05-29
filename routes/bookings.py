from fastapi import APIRouter
from models.booking import Booking
import pyrebase

router = APIRouter()

firebase = pyrebase.initialize_app({
    "apiKey": "YOUR_API_KEY",
    "authDomain": "YOUR_AUTH_DOMAIN",
    "projectId": "YOUR_PROJECT_ID",
    "storageBucket": "YOUR_STORAGE_BUCKET",
    "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
    "appId": "YOUR_APP_ID",
    "databaseURL": "YOUR_DATABASE_URL"
})
db = firebase.database()

@router.post("/")
async def create_booking(booking: Booking):
    db.child("bookings").push(booking.dict())
    return {"message": "Booking created"}

@router.get("/")
async def get_bookings():
    bookings = db.child("bookings").get().val()
    if bookings:
        return [booking for booking in bookings.values()]
    return []
