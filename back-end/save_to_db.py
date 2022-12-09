import sqlalchemy
import pandas as pd
import os
import functools as ft

def create_lagdata(df):
    lag_df = df.copy()
    for i in range(1,3):
        lag_df['vehicleCount_lag_'+str(i)] = lag_df.groupby(['REPORT_ID'])['vehicleCount'].shift(i)
    lag_df = lag_df.dropna()
    return lag_df

database_username = 'root'
database_password = 'Devih.2001'
database_ip       = '127.0.0.1'
database_name     = 'iot'
database_connection = sqlalchemy.create_engine('mysql+mysqlconnector://{0}:{1}@{2}/{3}'.
                                               format(database_username, database_password, 
                                                      database_ip, database_name))
files = os.listdir('./meta_data_date')
dfs=[]
for file in files:
    dftmp = pd.read_csv('./meta_data_date'+'/'+file)
    dftmp = dftmp[['date','time','REPORT_ID','DISTANCE_IN_METERS','vehicleCount','POINT_1_LAT','POINT_1_LNG', 'POINT_1_STREET', "POINT_2_LAT", "POINT_2_LNG", "POINT_2_STREET"]]
    dftmp['time_full'] = dftmp['time'].astype(str)
    dftmp['time_full'] = dftmp['time_full'].apply(lambda x: str(x) if (len(x)==2) else '0'+x) 
    dftmp['time_full'] = dftmp['time_full'].apply(lambda x: x+':00:00')
    dftmp['timestamp'] = dftmp['date']+' '+dftmp['time_full']
    dftmp.drop(['time_full'], axis=1, inplace=True)
    dftmp['day_of_week'] = pd.to_datetime(dftmp['timestamp']).dt.dayofweek
    print(dftmp['timestamp'].iloc[0])
    df_lag = create_lagdata(dftmp)
    dfs.append(df_lag)
df = pd.concat(dfs)                           
df.to_sql(con=database_connection, name='traffic_with_lag_data', index=False, if_exists='replace')