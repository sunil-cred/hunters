from os import getenv
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
DATABASE_URL = getenv("DATABASE_URL","")
MODULE_NAME = getenv("MODULE_NAME","/hunters")
BASE_ROUTE = getenv("BASE_ROUTE","/hunters")
LOG_LEVEL = getenv("LOG_LEVEL", "INFO")
ACCESS_KEY = getenv("ACCESS_KEY","tvTmSyNrjpxN33gBY7bQ0fBO2")
SMS_API_URL = getenv("SMS_API_URL")
SMS_ACCESS_TOKEN = getenv("SMS_ACCESS_TOKEN")