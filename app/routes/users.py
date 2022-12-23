from fastapi import Depends, APIRouter,Body
from sqlalchemy.orm import Session
from app.models import schemas
from app.models.insert_dummy_data import insert_dummy_data_cibil_accounts_history
from app.models.models import User
from app.database import get_db
from app.services.service import send_sms_otp,otp_gen,get_user_mobile,calculating_risk_factor,update_user_by_id
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
                print("------------")
                print(user_data)
                print("updating otp",user_data.id)
                if not update_user_by_id(db,user_data.id,{"otp":login_otp}):
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
            result = update_user_by_id(db,user.id,{"is_verified":True})
            print(result)
            if result:
                return  response_handler(True,"verification successful.",200,{"user_id": user.id})
    except Exception as e:
        print(e)
    return response_handler(True,"Unable to verify OTP.Please try again.",400,None)


@router.get("/users/check-risk")
async def check_user_risk(user_id: str, db: Session = Depends(get_db)):
    if calculating_risk_factor(user_id):
        return  response_handler(True,"Congrats your are eligible for Refinance.",200,None)
    return response_handler(True,"Sorry, you didn't qualify for refinance",400,None)



@router.post("/users/check-risk")
async def check_user_risk(otpLogin: schemas.OTPLogin, db: Session = Depends(get_db)):
    if otpLogin.otp == 12345:
        return  response_handler(True,"verification successful.",200,None)
    return response_handler(True,"Unable to send OTP currently.Please try again.",200,None)


@router.post("/dummy")
async def run_dummy_script(db: Session = Depends(get_db)):
    ## Import the data insertion method from insert_dummy_data.py to upload data
    status = insert_dummy_data_cibil_accounts_history(db)
    return {"success": status}

@router.post("/users/reason")
async def add_refinance_reason(user_id:int = Body(...), reason: str = Body(...), db: Session = Depends(get_db)):
    try:
        result = update_user_by_id(db,int(user_id),{"reason":reason})
        print(result)
        if result:
            return  response_handler(True,"Welcome to Refin.",201,None)
    except Exception as e:
        print(e)
    return response_handler(True,"Unable to add reason.Please try again.",400,None)

