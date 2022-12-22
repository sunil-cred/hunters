# FastAPI Boiler plate (psql edition)
add .env file outside app folder

DATABASE_URL = postgresql://localhost:5432/postgres\
MODULE_NAME = service_name\
BASE_ROUTE= /test\
SERVICE_NAME=test\
ENV=staging\
APM_SECRET_TOKEN=\
APM_SERVER_URL=\
LOG_LEVEL=INFO


# How to start it
* cd app
* pip install -r requirements.txt
* uvicorn server:app --reload



