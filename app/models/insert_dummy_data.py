import datetime

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from settings import *
import random
from app.models import models
from sqlalchemy.orm import Session

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def inser_dummy_data(db: Session):
    random_numbers = [8769043084, 9717583998, 8527555374, 9711467629, 8076153440, 97582557020]
    statuses = ["default", "closed", "partially closed", "recovered", "partially recovered"]
    for i in range(1, 2):
        dummy_data = {
            "loan_id": f"HUNTERS_{i}",
            "name": f"{i}_rupee_ki_pepsi",
            "mobile": random.choice(random_numbers),
            "email": f"hunter_{i}@yopmail.com",
            "loan_sanctioned_amount": 100000.0 + i,
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
            "status": random.choice(statuses)
        }
        try:
            db_item = models.LoanDetails(dummy_data)
            db.add(db_item)
            db.commit()
            db.refresh(db_item)
        except Exception as err:
            print("Failed to upload", err)



if __name__ == "__main__":
    # inser_dummy_data(Depend(get_db()))
    pass
