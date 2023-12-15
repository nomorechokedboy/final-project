import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from hsr_food import HSRFood 
from hsr_calculator import get_health_star_rating 
import os
from datetime import datetime
from pydantic import BaseModel

class HSRFoodBody(BaseModel):
    name: str
    category: str
    energy: float
    saturated_fat: float
    total_sugars: float
    sodium: float
    concentrated_fnvl: float
    fnvl: float
    fibre: float
    protein: float

def get_application() -> FastAPI:
    application = FastAPI(
        title='HSR server',
        description='HSR python server',
        openapi_url="/swagger.json",
        docs_url="/docs",
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return application

app = get_application()

@app.get('/')
def get():
    return RedirectResponse("/docs")

@app.get('/healthz')
def get():
    with open('/proc/uptime', 'r') as f:
        uptime = float(f.readline().split()[0])

    return { 
            "uptime": uptime,
            "message": 'I am fine! Update check for dev',
            "timestamp": datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
    }

@app.post("/api/v1/hsr/calc", tags=['HSR'])
def post(foodBody: HSRFoodBody):
    food = HSRFood(name=foodBody.name,category=foodBody.category,energy=foodBody.energy,saturated_fat=foodBody.saturated_fat,total_sugars=foodBody.total_sugars,sodium=foodBody.sodium,concentrated_fnvl=foodBody.concentrated_fnvl,fnvl=foodBody.fnvl,fibre=foodBody.fibre,protein=foodBody.protein)
    return get_health_star_rating(food)

if __name__ == "__main__":
    uvicorn.run(
        "index:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 5000)),
        reload=True,
        log_level=os.getenv('LOG_LEVEL', "info"),
        proxy_headers=True
    )
