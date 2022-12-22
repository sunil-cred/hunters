from fastapi import FastAPI
import logging
from app.routes.test_routes import router as test_router
from settings import *
from app.util.auth import get_service_permissions
from elasticapm.contrib.starlette import make_apm_client, ElasticAPM
from app.models import models
from app.database import SessionLocal, engine, Base

extra = {"app_name": MODULE_NAME}


logging.basicConfig(
    level=LOG_LEVEL, format=f"%(asctime)s {MODULE_NAME} %(levelname)s : %(message)s"
)


logger = logging.getLogger(__name__)
logger = logging.LoggerAdapter(logger, extra)


apm = make_apm_client(ELASTIC_APM)
app = FastAPI()
app.add_middleware(ElasticAPM, client=apm)
app.include_router(test_router, tags=["test"], prefix=f"{BASE_ROUTE}")


@app.on_event("startup")
async def startup_event():
    print("App Started")
    models.Base.metadata.create_all(bind=engine)


@app.on_event("shutdown")
async def shutdown_event():
    pass


@app.get(f"{BASE_ROUTE}/public/healthz", tags=["Root"])
async def health_check():
    return {"message": "OK"}


@app.get(f"{BASE_ROUTE}/public/permissions", tags=["Root"])
async def _get_service_permissions():
    return await get_service_permissions()
