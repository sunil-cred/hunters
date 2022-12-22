from ..constants import *
from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from app.models import schemas
from app.database import SessionLocal
from app.services.test_service import send_sms_otp,otp_gen
from app.util.rest_response import response_handler

router = APIRouter()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/users/generate-otp")
async def create_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    if await send_sms_otp(user.mobile,otp_gen()):
        return  response_handler(True,"OTP sent on mobile.",200,None)
    return response_handler(True,"Unable to send OTP currently.Please try again.",200,None)


