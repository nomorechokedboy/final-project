import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
import os
from datetime import datetime

def get_application() -> FastAPI:
    application = FastAPI(
        title='FastAPI with Minio',
        description='Integrate FastAPI with Minio',
        openapi_url="/openapi.json",
        docs_url="/docs"
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

@app.get('/', tags=[''])
def get():
    return RedirectResponse("/docs")

@app.get('/healthz', tags=[''])
def get():
    with open('/proc/uptime', 'r') as f:
        uptime = float(f.readline().split()[0])

    return { 
            "uptime": uptime,
            "message": 'I am fine! Update check for dev',
            "timestamp": datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
            }

if __name__ == "__main__":
    uvicorn.run(
        "index:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 5000)),
        reload=True,
        log_level=os.getenv('LOG_LEVEL', "info"),
        proxy_headers=True
    )
