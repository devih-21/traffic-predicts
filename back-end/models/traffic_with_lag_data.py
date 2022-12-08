from config.db import meta
from sqlalchemy import Table, Column

traffic_with_lag_data = Table(
  "traffic_with_lag_data", meta,
  Column("time"),
  Column("REPORT_ID"),
  Column("DISTANCE_IN_METERS"),
  Column("vehicleCount"),
  Column("timestamp"),
  Column("day_of_week"),
  Column("vehicleCount_lag_1"),
  Column("vehicleCount_lag_2"),
)