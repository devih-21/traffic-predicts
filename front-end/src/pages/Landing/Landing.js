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
} from 'antd';
import Footer from '../../components/layout/Footer';

import { useHistory } from 'react-router-dom';
import { apiChannelData } from '../../api/channelData';
import Marquee from 'react-smooth-marquee';
import Header from '../../components/layout/Header/Header';
import './index.scss';

const { Title, Text } = Typography;
export const Landing = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const data = await apiChannelData.getInfo();
    setInfo(data);
  };

  return <>{info}</>;
};
