from pydantic import BaseModel

class UserLogin(BaseModel):
    mobile: int

class OTPLogin(BaseModel):
    mobile: int
    otp: int

class User(BaseModel):
    user_id: int
