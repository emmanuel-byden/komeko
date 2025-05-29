from fastapi import APIRouter

router = APIRouter()

@router.get("/check")
async def check_auth():
    return {"message": "Authentication handled by Firebase"}
