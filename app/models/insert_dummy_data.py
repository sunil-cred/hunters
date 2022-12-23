import datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import Session
import random

from app.constants import RANDOM_NUMBERS, EXTRA_NUMBERS, LENDER_NAMES
from app.models import models

from settings import DATABASE_URL
engine = create_engine(DATABASE_URL)

def insert_dummy_data_loan_account_details(db: Session):
    status = True
    random_numbers = RANDOM_NUMBERS
    statuses = ["default", "closed", "partially closed", "recovered", "partially recovered"]
    for i in range(1, 51):
        if i <= 10:
            mobile = random_numbers[0]
            dummy_addition = 100
        elif i <= 20:
            mobile = random_numbers[1]
            dummy_addition = 200
        elif i <= 30:
            mobile = random_numbers[2]
            dummy_addition = 300
        elif i <= 40:
            mobile = random_numbers[3]
            dummy_addition = 400
        else:
            mobile = random_numbers[4]
            dummy_addition = 500
        dummy_data = {
            "loan_id": f"HUNTERS_{i}",
            "name": f"{i}_rupaiya_dega",
            "mobile": mobile,
            "email": f"hunter_{i}@yopmail.com",
            "loan_sanctioned_amount": 100000.0 + dummy_addition,
            "loan_tenure": 10,
            "rate_of_interest": 10.0,
            "emi_amount": 10000.0,
            "emi_type": "monthly",
            "emi_date": datetime.date(2022, 12, 23),
            "created_at": datetime.datetime.now(),
            "created_by": f"chirag@yopmail",
            "updated_at": datetime.datetime.now(),
            "updated_by": f"chirag@yopmail",
            "enach_enabled": False if i % 3 else True,
            "status": random.choice(statuses),
            "lender_id": random.randint(21, 30)
        }
        try:
            db_item = models.LoanDetails(**dummy_data)
            db.add(db_item)
            db.commit()
            db.refresh(db_item)
            print(f"Successful operation: {i}")
        except Exception as err:
            print("Failed to upload", err)
            status = False
    return status


def insert_dummy_data_lender_details(db: Session):
    status = True
    lender_names = LENDER_NAMES
    for i in range(21, 31):
        name = lender_names[i % 10]

        dummy_data = {
            "name": name,
            "payment_link": f"https://www.please-hack-this-link-{i}.com",
            "enable_pay_now": True,
            "enable_recurring": True,
            "enable_one_time": True,
            "settlement_percentage": 75,
            "created_at": datetime.datetime.now(),
            "created_by": "chirag@yopmail.com",
            "updated_at": datetime.datetime.now(),
            "updated_by": "chirag@yopmail.com",
            "is_deleted": False
        }
        try:
            db_item = models.LenderDetails(**dummy_data)
            db.add(db_item)
            db.commit()
            db.refresh(db_item)
            print(f"Successful operation: {i}")
        except Exception as err:
            print("Failed to upload", err)
            status = False
    return status


def insert_dummy_data_cibil_accounts(db: Session):
    status = True
    for i in range(2, 201):
        if i <= 20:
            account_id = 1
        elif i <= 40:
            account_id = 2
        elif i <= 60:
            account_id = 3
        elif i <= 80:
            account_id = 4
        elif i <= 100:
            account_id = 5
        elif i <= 120:
            account_id = 6
        elif i <= 140:
            account_id = 7
        elif i <= 160:
            account_id = 8
        elif i <= 180:
            account_id = 9
        else:
            account_id = 10

        if account_id <= 5 and i % 2:
            loan_id = 100 + i
            type = "LOAM"
        else:
            loan_id = 201 + i
            type = "CREDIT_CARD"
            if i % 2:
                type = "LOAN"

        lender_id = random.randint(21, 30)
        lender_name = LENDER_NAMES[lender_id % 10]
        dummy_data = {
            "account_id": account_id,
            "loan_id": loan_id,
            "type": type,
            "amount": 10000,
            "amount_remaining": 1000,
            "lender_id": lender_id,
            "lender_name": lender_name,
            "status": True if i % 3 else False,
            "open_date": datetime.date.today(),
            "close_date": datetime.date(2023, 1, 31)
        }
        try:
            db_item = models.CibilAccounts(**dummy_data)
            db.add(db_item)
            db.commit()
            db.refresh(db_item)
            print(f"Successful operation: {i}")
        except Exception as err:
            print("Failed to upload", err)
            status = False
    return status


def insert_dummy_data_cibil(db: Session):
    status = True
    for i in range(1, 11):
        if i <= 5:
            mobile = RANDOM_NUMBERS[i-1]
            active_loans = 15
            active_credit_cards = 5
            score = 480 + i*10
        else:
            mobile = EXTRA_NUMBERS[i-6]
            active_loans = 10
            active_credit_cards = 10
            score = 450 + i*10
        dummy_data = {
            "mobile": mobile,
            "active_loans": active_loans,
            "total_loan_amount": 100000.0 + (i * 100),
            "active_credit_cards": active_credit_cards,
            "overdue_payments": 10,
            "overdue_payment_amount": 10000,
            "score": score,
            "created_at": datetime.datetime.now(),
            "updated_at": datetime.datetime.now()
        }
        try:
            db_item = models.Cibil(**dummy_data)
            db.add(db_item)
            db.commit()
            db.refresh(db_item)
            print(f"Successful operation: {i}")
        except Exception as err:
            print("Failed to upload", err)
            status = False
    return status



def insert_dummy_data_cibil_accounts_history(db: Session):
    status = True
    for i in range(1, 50):
        if i % 3:
            status = "Successful"
            due_date = datetime.datetime(2022, 11, 10)
            payment_date = datetime.datetime(2022, 11, 5)
        elif i % 5:
            status = "Processing"
            due_date = datetime.datetime(2022, 12, 30)
            payment_date = datetime.datetime(2022, 12, 23)
        else:
            status = "Failed"
            due_date = datetime.datetime(2022, 12, 20)
            payment_date = datetime.datetime(2022, 12, 15)
        dummy_data = {
            "transaction_id": i,
            "account_id": 10 + i,
            "status": status,
            "due_date": due_date,
            "amount": 1000,
            "payment_date": payment_date
        }
        try:
            db_item = models.CibilAccountsHistory(**dummy_data)
            db.add(db_item)
            db.commit()
            db.refresh(db_item)
            print(f"Successful operation: {i}")
        except Exception as err:
            print("Failed to upload", err)
            status = False
    return status
