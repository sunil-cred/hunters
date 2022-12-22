from ..constants import *
from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from app.models import schemas
from app.models.models import User
from app.database import SessionLocal
from app.services.service import send_sms_otp,otp_gen
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

@router.post("/users/verify-otp")
async def verify_otp(otpLogin: schemas.OTPLogin, db: Session = Depends(get_db)):
    if otpLogin.otp == 12345:
        db.add(User(mobile=otpLogin.mobile))
        db.commit()
        return  response_handler(True,"verification successful.",200,None)
    return response_handler(True,"Unable to send OTP currently.Please try again.",200,None)


@router.post("/users/check-risk")
async def check_user_risk(otpLogin: schemas.OTPLogin, db: Session = Depends(get_db)):
    if otpLogin.otp == 12345:
        return  response_handler(True,"verification successful.",200,None)
    return response_handler(True,"Unable to send OTP currently.Please try again.",200,None)