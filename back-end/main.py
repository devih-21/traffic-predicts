from typing import Union
from fastapi import FastAPI
from models.index import traffic_with_lag_data
from fastapi.middleware.cors import CORSMiddleware
from config.db import connect_to_db
import pandas as pd

app = FastAPI()
connect = connect_to_db()
origins = [
  "http://localhost",
  "http://localhost:3000",
  "http://localhost:8000"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
  expose_headers=["*"]
)
@app.get("/")
def read_root():
  return {"Hello": "World"}

def get_data():
  data1 = pd.read_sql('SELECT distinct REPORT_ID, POINT_1_LAT, POINT_1_LNG FROM `traffic_with_lag_data`', con=connect)
  return data1.to_dict(orient='REPORT_ID')

@app.get("/info")
def read_info():
  data = get_data()
  return {"data": data}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/decision-tree-regressor")
def handle_generate(reportId: str, timestamp: str):
    return {"reportId": reportId, "timestamp": timestamp}