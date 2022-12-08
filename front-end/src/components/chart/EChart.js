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
import { Row, Col, Typography } from 'antd';

function EChart({ subsData }) {
  const { Title, Paragraph } = Typography;
  const eChart = {
    series: [
      {
        name: 'View',
        data: [...subsData?.month?.map((item) => item?.views)],
        color: '#fff',
      },
    ],

    options: {
      chart: {
        type: 'bar',
        width: '100%',
        height: 'auto',

        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['transparent'],
      },
      grid: {
        show: true,
        borderColor: '#ccc',
        strokeDashArray: 2,
      },
      xaxis: {
        categories: [...subsData?.month?.map((item) => item?.month)],
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [...subsData?.month?.map((item) => '#fff')],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [...subsData?.month?.map((item) => '#fff')],
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val + ' views';
          },
        },
      },
    },
  };

  const items = [
    {
      Title: '3,6K',
      user: 'Users',
    },
    {
      Title: '2m',
      user: 'Clicks',
    },
    {
      Title: '772',
      user: 'Sales',
    },
    {
      Title: '82',
      user: 'Items',
    },
  ];

  return (
    <>
      <div id="chart">
        <Title level={4}>VIEWS OVER TIMEOUT</Title>

        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>

      <div className="chart-vistior">
        <Paragraph className="lastweek">
          We have created multiple options for you to put together and customise
          into pixel perfect pages.
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
