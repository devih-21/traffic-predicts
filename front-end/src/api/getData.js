import { rest } from './rest';

export const getData = {
  getInfo: (query) => rest.get('/info_map', query, null, true),
  getDateByReportId: (query) =>
    rest.get('/get_date_by_report_id', query, null, true),
  getTimeByDate: (query) => rest.get('/get_time_by_date', query, null, true),
  decisionTreeRegressor: (query) =>
    rest.get('/decision-tree-regressor', query, null, true),
  lassoRegressor: (query) => rest.get('/lasso-regressor', query, null, true),
  knnClassification: (query) =>
    rest.get('/knn-classification', query, null, true),
};
