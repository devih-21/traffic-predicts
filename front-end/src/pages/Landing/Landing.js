import React, { useState, useEffect } from 'react';
import {
  Form,
  Card,
  Col,
  Row,
  Typography,
  Button,
  message,
  Space,
  Layout,
  Select,
  Spin,
} from 'antd';

import { getData } from '../../api/getData';
import './index.scss';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const { Title } = Typography;

export const Landing = () => {
  const [form] = Form.useForm();
  const [info, setInfo] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [timeSelected, setTimeSelected] = useState(null);
  const [modelSelected, setModelSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataGen, setDataGen] = useState(null);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const data = await getData.getInfo();
    setInfo(data?.data);
  };

  const _getDateByReportId = async () => {
    const reportId = form.getFieldValue('reportId');
    const date = await getData.getDateByReportId({
      reportId: reportId,
    });
    form.setFieldsValue({ model: null, time: null, date: null });
    setDate(date?.data?.date);
    setReportId(reportId);
  };

  const _getTimeByReportId = async () => {
    const date = form.getFieldValue('date');
    const time = await getData.getTimeByDate({
      reportId: reportId,
      date: date,
    });
    form.setFieldsValue({ model: null, time: null });
    setTime(time?.data?.time);
  };

  const handleTimeSelected = () => {
    const time = form.getFieldValue('time');
    form.setFieldsValue({ model: null });
    setTimeSelected(time);
  };

  const handleModelSelected = () => {
    const model = form.getFieldValue('model');
    setModelSelected(model);
  };

  const submitForm = async (formData) => {
    setLoading(true);
    const { reportId, model, date, time } = formData;
    const query = {
      reportId,
      timestamp: `${date} ${time < 10 ? '0' + time : time}:00:00`,
    };
    let data;
    if (model === 'Decision Tree Regressor') {
      data = await getData.decisionTreeRegressor(query);
    } else if (model === 'Lasso Regressor') {
      data = await getData.lassoRegressor(query);
    } else if (model === 'KNN Classification') {
      data = await getData.knnClassification(query);
    }
    setDataGen(data);
    setLoading(false);
  };

  return (
    <>
      <div className="screen">
        {info?.length ? (
          <>
            <Form
              className="form-input"
              labelAlign="left"
              form={form}
              {...layout}
              layout="horizontal"
              onFinish={submitForm}>
              <Form.Item
                label="Chọn địa điểm"
                name="reportId"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}>
                <Select
                  showSearch
                  onSelect={_getDateByReportId}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }>
                  {info?.map((item, key) => (
                    <Option
                      key={key}
                      value={item?.REPORT_ID}
                      label={`${item?.POINT_1_STREET} - ${item?.POINT_2_STREET}`}>
                      {item?.POINT_1_STREET} - {item?.POINT_2_STREET}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {date && (
                <Form.Item
                  label="Chọn ngày"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}>
                  <Select onSelect={_getTimeByReportId}>
                    {Object.values(date)?.map((item, key) => (
                      <Option key={key} value={item} label={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
              {time && (
                <Form.Item
                  label="Chọn giờ"
                  name="time"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}>
                  <Select onSelect={handleTimeSelected}>
                    {Object.values(time)?.map((item, key) => (
                      <Option key={key} value={item} label={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}

              {timeSelected && (
                <Form.Item
                  label="Chọn Model"
                  name="model"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}>
                  <Select onSelect={handleModelSelected}>
                    <Option value="Decision Tree Regressor">
                      Decision Tree Regressor
                    </Option>
                    <Option value="Lasso Regressor">Lasso Regressor</Option>
                    <Option value="KNN Classification">
                      KNN Classification
                    </Option>
                  </Select>
                </Form.Item>
              )}
              {modelSelected && (
                <Form.Item
                  wrapperCol={{
                    offset: 12,
                    span: 12,
                  }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Dự đoán
                  </Button>
                </Form.Item>
              )}
            </Form>
            {dataGen && (
              <>
                <Title level={3}>Dữ liệu thật: {dataGen?.actual}</Title>
                <Title level={3}>Dữ liệu dự đoán: {dataGen?.predict}</Title>
                <Title level={3}>
                  Tỉ lệ: {dataGen?.predict / dataGen?.actual}
                </Title>
              </>
            )}
          </>
        ) : (
          <Spin size="large" className="form-input" />
        )}
      </div>
    </>
  );
};
