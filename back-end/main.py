from typing import Union
from fastapi import FastAPI
from models.index import traffic_with_lag_data
from fastapi.middleware.cors import CORSMiddleware
from config.db import connect_to_db
import pandas as pd
import pickle
import numpy as np


class CustomUnpickler(pickle.Unpickler):

    def find_class(self, module, name):
        if name == 'MyDecisionTreeRegressor':
            from MyDecisionTreeRegressor import MyDecisionTreeRegressor
            return MyDecisionTreeRegressor
        if name == 'Node':
            from Node import Node
            return Node
        if name == 'Regression':
            from lassoregression import Regression
            return Regression
        if name == 'l1_regularization':
            from lassoregression import l1_regularization
            return l1_regularization
        if name == 'LassoRegression':
            from lassoregression import LassoRegression
            return LassoRegression
        if name == 'K_Nearest_Neighbors_Classifier':
            from knn import K_Nearest_Neighbors_Classifier
            return K_Nearest_Neighbors_Classifier
        return super().find_class(module, name)

app = FastAPI()
connect = connect_to_db()
origins = [
  "http://localhost",
  "http://localhost:3001",
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

def get_model():
  model = CustomUnpickler(open('models/MyDecisionTreeRegressorModelWithDOW.sav', 'rb')).load()
  return model

def get_lasso_model():
  model = CustomUnpickler(open('models/MyLassoRegression.sav', 'rb')).load()
  return model

def get_knn_model():
  model = CustomUnpickler(open('models/MyKNNClassifier.sav', 'rb')).load()
  return model

def get_data():
  data = pd.read_sql('SELECT distinct REPORT_ID, POINT_1_LAT, POINT_1_LNG, POINT_2_LAT, POINT_2_LNG, POINT_1_STREET, POINT_2_STREET FROM `traffic_with_lag_data`', con=connect)
  return data.to_dict(orient='REPORT_ID')

@app.get("/")
def read_root():
  return {"Hello": "World"}


@app.get("/info_map")
def read_info():
  data = get_data()
  return {"data": data}

@app.get("/get_date_by_report_id")
def get_date(reportId: str):
  data = pd.read_sql("SELECT distinct date FROM `traffic_with_lag_data` where REPORT_ID =" + reportId, con=connect)
  return {"data": data}

@app.get("/get_time_by_date")
def get_date(reportId: str, date: str):
  data = pd.read_sql('SELECT time, timestamp FROM `traffic_with_lag_data` WHERE REPORT_ID = %s AND date = %s', con=connect, params=(reportId, date))
  print(data)
  return {"data": data.to_dict()}

@app.get("/decision-tree-regressor")
def handle_generate(reportId: str, timestamp: str):
  model = get_model()
  df = pd.read_sql('SELECT * FROM `traffic_with_lag_data` WHERE REPORT_ID = %s AND TIMESTAMP = %s', con=connect, params=(reportId, timestamp))
  actual = df['vehicleCount'].values[0]
  cols = ['time','day_of_week','REPORT_ID','DISTANCE_IN_METERS','vehicleCount_lag_1','vehicleCount_lag_2','vehicleCount']
  df = df[cols]
  input_data = df.iloc[:, :-1].values
  predict = model.predict(input_data)[0]
  return {"actual": int(actual), "predict": float(predict)}

@app.get("/lasso-regressor")
def handle_generate(reportId: str, timestamp: str):
  model = get_lasso_model()
  df = pd.read_sql('SELECT * FROM `traffic_with_lag_data` WHERE REPORT_ID = %s AND TIMESTAMP = %s', con=connect, params=(reportId, timestamp))
  actual = df['vehicleCount'].values[0]
  cols = ['time','vehicleCount_lag_1','vehicleCount_lag_2','vehicleCount']
  df = df[cols]
  input_data = df.iloc[:, :-1].values
  predict = model.predict(input_data)[0]
  return {"actual": int(actual), "predict": float(predict)}

@app.get("/knn-classification")
def handle_generate(reportId: str, timestamp: str):
  model = get_knn_model()
  df = pd.read_sql('SELECT * FROM `traffic_with_lag_data` WHERE REPORT_ID = %s AND TIMESTAMP = %s', con=connect, params=(reportId, timestamp))

  vehicleCount = df['vehicleCount'].values[0]

  '''Classification: 0: Vang, 1: Vua, 2: Dong'''
  actual = np.where(vehicleCount>=20,np.where(vehicleCount>=50, 2,1), 0)

  cols = ['time','REPORT_ID','DISTANCE_IN_METERS','vehicleCount_lag_1','vehicleCount_lag_2','vehicleCount']
  df = df[cols]
  input_data = df.iloc[:, :].values
  predict = model.predict(input_data)[0]
  return {"actual": int(actual), "predict": float(predict)}