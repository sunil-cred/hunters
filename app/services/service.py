import json
import random
from datetime import datetime
from http import HTTPStatus

from settings import SMS_API_URL,SMS_ACCESS_TOKEN
import requests
from sqlalchemy.orm import Session
from sqlalchemy import update
from app.models.models import User, Cibil, CibilAccounts
import time
from datetime import date, timedelta

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


def update_user_by_id(db:Session,user_id:int,values):
    result = db.query(User).filter(User.id==user_id).update(values=values,synchronize_session="fetch")
    db.commit()
    return result


def calculating_risk_factor(user_id):
    time.sleep(0.8)
    return random.randint(300, 900) > 600


async def fetch_account_details(mobile, db: Session):
    user_name = get_user_mobile(db, mobile)
    name = user_name.first_name
    if user_name.first_name and user_name.last_name:
        name += (" " + user_name.last_name)
    response = []
    total_amount_due = 0
    data = {
        "name": name,
        "total_amount_to_be_paid": 0.00,
        "accounts_details": response
    }
    try:
        response = db.query(Cibil).filter(Cibil.mobile == mobile).first()
    except Exception as e:
        print("Failed to fetch account details", e)
        return False, "Failed to fetch account details", HTTPStatus.INTERNAL_SERVER_ERROR.value, {}
    if not response:
        return True, "Account details not available", HTTPStatus.OK.value, data
    account_id = response.id
    try:
        accounts = db.query(CibilAccounts).filter(CibilAccounts.account_id == account_id).all()
    except Exception as e:
        print("Failed to fetch account details", e)
        return False, "Failed to fetch account details", HTTPStatus.INTERNAL_SERVER_ERROR.value, {}
    accounts_response = list()
    for x in accounts:
        total_amount_due += x.amount_remaining if x.amount_remaining else 0
        account_data = {
            "account_id": x.account_id,
            "loan_id": x.loan_id,
            "type": x.type,
            "amount_remaining": x.amount_remaining,
            "due_date": date(2022, 12, 15) + timedelta(days=random.randint(1, 60))
        }
        accounts_response.append(account_data)

    data["total_amount_to_be_paid"] = total_amount_due
    data["accounts_details"] = accounts_response

    return True, "Successfully fetched account details", HTTPStatus.OK.value, data