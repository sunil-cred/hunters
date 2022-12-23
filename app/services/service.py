import json
import random
from settings import SMS_API_URL,SMS_ACCESS_TOKEN
import requests
from sqlalchemy.orm import Session
from sqlalchemy import BIGINT
from sqlalchemy import update
from app.models.models import User

async def send_sms_otp(mobile,  otp):
    sms_flag = False
    url = f"{SMS_API_URL}/sms"
    data = {
        "sms_mobile": mobile,
        "sms_body": f"Your Credgenics verification code is {otp}. OTPs are SECRET. DO NOT disclose it to anyone.",
        "content_template_id": "1107161513838675588",
        "principal_entity_id": "1101360080000040019",
        "source": "otp",
        "module": "platform"
    }
    headers = {
        "authenticationtoken" : SMS_ACCESS_TOKEN,
        "referer" : "hackathon",
        "content-type":"application/json",
    }

    res = requests.post(url, data=json.dumps(data), headers=headers)
    print(res.status_code)
    print(res.text)
    if hasattr(res, "text"):
        if res.status_code in (200, 201):
            sms_flag = True
        else:
            return False
    else:
        return False
    return sms_flag

def otp_gen():
    otp = ""
    for i in range(5):
        otp += str(random.randint(1, 9))
    return int(otp)

def get_user_id(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    print(user)
    return user

def get_user_mobile(db: Session, _mobile: int):
    return db.query(User).filter(User.mobile == _mobile).first()

def create_user(db:Session, mobile:int):
    db.add(User(mobile=mobile))
    return db.commit()

def update_user_status(db:Session,user_id:int):
    stmt = (
        update(User)
        .where(User.id == user_id)
        .values(is_verified=True)
        .execution_options(synchronize_session="fetch")
    )
    return db.execute(stmt)

def update_user_otp(db:Session,user_id:int,otp:int):
    stmt = (
        update(User)
        .where(User.id == user_id)
        .values(otp=otp)
        .execution_options(synchronize_session="fetch")
    )
    return db.execute(stmt)