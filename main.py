from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, bookings, services

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth")
app.include_router(bookings.router, prefix="/api")
app.include_router(services.router)
