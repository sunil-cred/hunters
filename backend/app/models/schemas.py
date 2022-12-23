from pydantic import BaseModel
from fastapi import UploadFile, File

class UserLogin(BaseModel):
    mobile: int

class OTPLogin(BaseModel):
    mobile: int
    otp: int

class User(BaseModel):
    user_id: int

class AccountDetails(BaseModel):
    mobile: int
