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
    created_at = Column(TIMESTAMP,ColumnDefault("now()"))
    updated_at =Column(TIMESTAMP,ColumnDefault("now()"))
    is_deleted = Column(Boolean,ColumnDefault(False))
    otp = Column(Integer)
    is_verified = Column(Boolean,ColumnDefault(False))


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
    enach_enabled = Column(Boolean)
    status = Column(String)
    created_at = Column(TIMESTAMP)
    created_by = Column(String)
    updated_at = Column(TIMESTAMP)
    updated_by = Column(String)
    is_deleted = Column(Boolean,ColumnDefault(False))
    lender_id = Column(BIGINT,ForeignKey("lender_details.id"))

class Transactions(Base):
    __tablename__ = "transactions"

    id = Column(BIGINT, primary_key=True, index=True, autoincrement=True)
    user_id = Column(BIGINT)
    account_id = Column(BIGINT)
    lender_id = Column(BIGINT)
    amount = Column(FLOAT)
    repayment_date = Column(DATE)
    payment_type = Column(String)
    status = Column(String)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)

class LenderDetails(Base):
    __tablename__ = "lender_details"

    id = Column(BIGINT, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    payment_link = Column(String)
    enable_pay_now = Column(Boolean)
    enable_recurring = Column(Boolean)
    enable_one_time = Column(Boolean)
    settlement_percentage = Column(Integer)
    created_at = Column(TIMESTAMP)
    created_by = Column(String)
    updated_at = Column(TIMESTAMP)
    updated_by = Column(String)
    is_deleted = Column(Boolean)

class DocumentDetails(Base):
    __tablename__ = "document_details"

    id = Column(BIGINT, primary_key=True, index=True, autoincrement=True)
    user_id = Column(BIGINT)
    account_id = Column(BIGINT)
    document_type = Column(String)
    document_link = Column(String)
    verified_by = Column(String)
    verified_at = Column(TIMESTAMP)
    verification_status = Column(String)
    created_at = Column(TIMESTAMP)
    created_by = Column(String)
    Updated_at = Column(TIMESTAMP)
    Updated_by = Column(String)
    is_deleted = Column(Boolean)

class Cibil(Base):
    __tablename__ = "cibil"

    id = Column(BIGINT, primary_key=True, index=True, autoincrement=True)
    mobile = Column(BIGINT)
    active_loans = Column(Integer)
    total_loan_amount = Column(FLOAT)
    active_credit_cards = Column(Integer)
    overdue_payments = Column(Integer)
    overdue_payment_amount = Column(FLOAT)
    score = Column(Integer,ColumnDefault(500))
    created_at = Column(TIMESTAMP,ColumnDefault("now()"))
    updated_at = Column(TIMESTAMP,ColumnDefault("now()"))

class CibilAccounts(Base):
    __tablename__ = "cibil_accounts"

    account_id = Column(BIGINT)
    loan_id = Column(BIGINT, primary_key=True, index=True)
    type = Column(String,ColumnDefault("LOAN"))
    amount = Column(FLOAT)
    amount_remaining = Column(FLOAT)
    lender_id = Column(String)
    lender_name = Column(String)
    status = Column(Boolean,ColumnDefault(True))
    open_date = Column(TIMESTAMP,ColumnDefault("now()"))
    close_date = Column(TIMESTAMP)

class CibilAccountsHistory(Base):
    __tablename__ = "cibil_account_history"

    transaction_id = Column(BIGINT,primary_key=True, index=True, autoincrement=True)
    account_id = Column(BIGINT)
    status = Column(String)
    due_date = Column(DATE)
    amount = Column(FLOAT)
    payment_date = Column(TIMESTAMP)