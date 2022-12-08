/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import ReactApexChart from 'react-apexcharts';
import { Typography } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import lineChart from './configs/lineChart';

function LineChart({ subsData }) {
  const { Title, Paragraph } = Typography;

  const lineChart = {
    series: [
      {
        name: 'News Sub',
        data: [...subsData?.month?.map((item) => item?.gain)],
        offsetY: 0,
      },
      {
        name: 'Lost Subs',
        data: [...subsData?.month?.map((item) => item?.lost)],
        offsetY: 0,
      },
    ],

    options: {
      chart: {
        width: '100%',
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },

      yaxis: {
        labels: {
          style: {
            fontSize: '14px',
            fontWeight: 600,
            colors: ['#8c8c8c'],
          },
        },
      },

      xaxis: {
        labels: {
          style: {
            fontSize: '14px',
            fontWeight: 600,
            colors: [...subsData?.month?.map((item) => '8c8c8c')],
          },
        },
        categories: [
          ...subsData?.month?.map((item) => item?.month.slice(0, 3)),
        ],
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  return (
    <>
      <Title level={4}>SUBS OVER TIME</Title>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={'100%'}
      />
    </>
  );
}

export default LineChart;
