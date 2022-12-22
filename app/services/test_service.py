import random
from settings import SMS_API_URL,SMS_ACCESS_TOKEN
import requests

async def send_sms_otp(mobile,  otp):
    sms_flag = False
    url = f"{SMS_API_URL}/sms"
    data = {
        "sms_mobile": mobile,
        "sms_body": f"Your Hunters verification code is {otp}. OTPs are SECRET. DO NOT disclose it to anyone.",
        "content_template_id": "1107161513838675588",
        "principal_entity_id": "1101360080000040019"
    }
    headers = {
        "authenticationtoken" : SMS_ACCESS_TOKEN,
        "referer" : "hackathon"
    }

    res = requests.post(url, json=data, headers=headers)
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
    return otp