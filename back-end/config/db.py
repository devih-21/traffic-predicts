from sqlalchemy import create_engine, MetaData
import os
import pandas as pd



meta=MetaData()
# connect_db = database_connection.connect()

def connect_to_db():
  database_username = 'root'
  database_password = 'Devih.2001'
  database_ip       = '127.0.0.1'
  database_name     = 'iot'

  database_connection = create_engine('mysql+mysqlconnector://{0}:{1}@{2}/{3}'.format(database_username, database_password, database_ip, database_name))
  df = pd.read_sql('SELECT count(*) FROM `traffic_with_lag_data`', con=database_connection)
  return database_connection