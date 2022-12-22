from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,TIMESTAMP,BIGINT,DATE,ColumnDefault,FLOAT
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users_details"

    id = Column(BIGINT, primary_key=True, index=True,autoincrement=True)
    first_name = Column(String)
    last_name = Column(String)
    mobile = Column(BIGINT)
    email =  Column(String)
    date_of_birth = Column(DATE)
    created_at = Column(TIMESTAMP)
    updated_at =Column(TIMESTAMP,ColumnDefault("now()"))
    is_deleted = Column(Boolean,ColumnDefault(False))


class LoanDetails(Base):
    __tablename__ = "loan_account_details"

    id = Column(BIGINT, primary_key=True, index=True, autoincrement=True)
    loan_id = Column(String)
    name = Column(String)
    mobile = Column(BIGINT)
    email = Column(String)
    loan_sanctioned_amount = Column(FLOAT)
    loan_tenure = Column(Integer)
    rate_of_interest = Column(FLOAT)
    emi_amount = Column(FLOAT)
    emi_type = Column(String)
    emi_date = Column(DATE)
    created_at = Column(TIMESTAMP)
    created_by = Column(String)
    updated_at = Column(TIMESTAMP)
    updated_by = Column(String)
