from os import getenv
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
DATABASE_URL = getenv("DATABASE_URL")
MODULE_NAME = getenv("MODULE_NAME")
BASE_ROUTE = getenv("BASE_ROUTE")
LOG_LEVEL = getenv("LOG_LEVEL", "INFO")

ELASTIC_APM = {
    "SERVICE_NAME": getenv("SERVICE_NAME"),
    "SECRET_TOKEN": getenv("APM_SECRET_TOKEN"),
    "SERVER_URL": getenv("APM_SERVER_URL"),
    "ENVIRONMENT": getenv("ENV"),
    "LOG_LEVEL": getenv("LOG_LEVEL", "INFO"),
    "VERIFY_SERVER_CERT": bool(getenv("APM_VERIFY_SERVER_CERT", "False")),
    "TRANSACTION_IGNORE_URLS": ["*/healthz"],
    "LOCAL_VAR_DICT_MAX_LENGTH": int(getenv("APM_LOCAL_VAR_DICT_MAX_LENGTH", "25")),
    "LOCAL_VAR_MAX_LENGTH": int(getenv("APM_LOCAL_VAR_MAX_LENGTH", "1000")),
    "CAPTURE_BODY": getenv("APM_CAPTURE_BODY", "off"),
    "SPAN_STACK_TRACE_MIN_DURATION": getenv("APM_CAPTURE_BODY", 0),
}
