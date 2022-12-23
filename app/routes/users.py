from ..constants import *
from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from app.models import schemas
from app.models.models import User
from app.database import get_db
from app.services.service import send_sms_otp,otp_gen,get_user_mobile,get_user_id,update_user_otp,update_user_status
from app.util.rest_response import response_handler

router = APIRouter()


@router.post("/users/generate-otp")
async def create_user_api(user: schemas.UserLogin, db: Session = Depends(get_db)):
    try:
        login_otp = otp_gen()
        if await send_sms_otp(user.mobile,login_otp):
            user_data = get_user_mobile(db,user.mobile)
            if not user_data:
                print("creating user and otp")
                db.add(User(mobile=user.mobile,otp=login_otp))
                db.commit()
            else:
                print("updating otp")
                if not update_user_otp(db,user_data.id,login_otp):
                    raise Exception("unable to update otp")
            return  response_handler(True,"OTP sent on mobile.",200,None)
    except Exception as e:
        print(e)
    return response_handler(True,"Unable to send OTP currently.Please try again.",400,None)

@router.post("/users/verify-otp")
async def verify_otp(otpLogin: schemas.OTPLogin, db: Session = Depends(get_db)):
    try:
        user = get_user_mobile(db,otpLogin.mobile)
        if user and otpLogin.otp == int(user.otp):
            result = update_user_status(db,user.id)
            print(result)
            if result:
                return  response_handler(True,"verification successful.",200,{"user_id": user.id})
    except Exception as e:
        print(e)
    return response_handler(True,"Unable to verify OTP.Please try again.",400,None)


@router.post("/users/check-risk")
async def check_user_risk(otpLogin: schemas.OTPLogin, db: Session = Depends(get_db)):
    if otpLogin.otp == 12345:
        return  response_handler(True,"verification successful.",200,None)
    return response_handler(True,"Unable to send OTP currently.Please try again.",200,None)