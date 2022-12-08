from typing import Union
from fastapi import FastAPI
from models.index import traffic_with_lag_data
# from config.db import connect_db, database_connection
from config.db import connect_to_db
import pandas as pd

app = FastAPI()
connect = connect_to_db()

@app.get("/")
def read_root():
  return {"Hello": "World"}

def get_data():
  data1 = pd.read_sql('SELECT distinct REPORT_ID, POINT_1_LAT, POINT_1_LNG FROM `traffic_with_lag_data`', con=connect)
  return data1.to_dict(orient='REPORT_ID')

@app.get("/info")
def read_info():
  data = get_data()
  print(data)
  return {"data": data}