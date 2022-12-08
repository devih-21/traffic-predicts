import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Card, Col, Row } from 'antd';

import './index.scss';

export const NavFeatures = () => {
  const params = useParams();
  const { platform } = params;
  const history = useHistory();
  const { pathname } = useLocation();
  const pageActive = pathname.split('/')[3];
  const loginType = sessionStorage.getItem('loginType');

  return (
    <div className="feature-nav">
      {platform === 'youtube' && (
        <>
          <Row
            gutter={[24, 0]}
            style={{
              justifyContent: 'center',
            }}>
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'social-media-audit' ? 'active' : ''
                }`}
                onClick={() =>
                  history.push(`/analysis/${platform}/social-media-audit`)
                }>
                1. Social Media Audit
              </div>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'video-analysis' ? 'active' : ''
                }`}
                onClick={() =>
                  history.push(`/analysis/${platform}/video-analysis`)
                }>
                2. Video Analysis
              </div>
            </Col>
            {loginType === 'google' && (
              <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                <div
                  className={`button-nav ${
                    pageActive === 'video-formula-search' ? 'active' : ''
                  }`}
                  onClick={() =>
                    history.push(`/analysis/${platform}/video-formula-search`)
                  }>
                  3. Video Search
                </div>
              </Col>
            )}
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'content-creation' ? 'active' : ''
                }`}
                onClick={() =>
                  history.push(`/analysis/${platform}/content-creation`)
                }>
                4. Content Idea & Creation
              </div>
            </Col>
          </Row>
          <Row
            gutter={[24, 0]}
            style={{
              justifyContent: 'center',
            }}>
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'script-suggestion' ? 'active' : ''
                }`}
                onClick={() =>
                  history.push(`/analysis/${platform}/script-suggestion`)
                }>
                5. Script Idea & Creation
              </div>
            </Col>
            {/* <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'audience-analysis' ? 'active' : ''
                }`}
                onClick={() =>
                  history.push(`/analysis/${platform}/audience-analysis`)
                }>
                6. Target Audience
              </div>
            </Col> */}
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'testing' ? 'active' : ''
                }`}
                onClick={() => history.push(`/analysis/${platform}/testing`)}>
                6. Re-Launch
              </div>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'competitive-analysis' ? 'active' : ''
                }`}
                onClick={() =>
                  history.push(`/analysis/${platform}/competitive-analysis`)
                }>
                7. Competitive Analysis
              </div>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'video-creation' ? 'active' : ''
                }`}
                onClick={() =>
                  history.push(`/analysis/${platform}/video-creation`)
                }>
                8. Video Creation
              </div>
            </Col>
          </Row>
        </>
      )}
      {platform === 'create-mode' && (
        <Row
          gutter={[24, 0]}
          style={{
            justifyContent: 'center',
          }}>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div
              className={`button-nav ${
                pageActive === 'create' ? 'active' : ''
              }`}
              onClick={() => history.push(`/analysis/${platform}/create`)}>
              Create Mode
            </div>
          </Col>
        </Row>
      )}
      {platform === 'tiktok' && (
        <Row
          gutter={[24, 0]}
          style={{
            justifyContent: 'center',
          }}>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div
              className={`button-nav ${
                pageActive === 'analysis' ? 'active' : ''
              }`}
              onClick={() => history.push(`/analysis/${platform}/tiktok`)}>
              Tiktok Analysis
            </div>
          </Col>
        </Row>
      )}
      {platform === 'trending' && (
        <Row
          gutter={[24, 0]}
          style={{
            justifyContent: 'center',
          }}>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div
              className={`button-nav ${
                pageActive === 'suggest' ? 'active' : ''
              }`}
              onClick={() => history.push(`/analysis/${platform}/suggest`)}>
              1. Trending Suggest
            </div>
          </Col>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div
              className={`button-nav ${
                pageActive === 'region' ? 'active' : ''
              }`}
              onClick={() => history.push(`/analysis/${platform}/region`)}>
              2. Trending Region
            </div>
          </Col>
        </Row>
      )}
      {/* {platform === 'plagiarism' && (
        <Row
          gutter={[24, 0]}
          style={{
            justifyContent: 'center',
          }}>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div
              className={`button-nav ${pageActive === 'check' ? 'active' : ''}`}
              onClick={() => history.push(`/analysis/${platform}/check`)}>
              Plagiarism
            </div>
          </Col>
        </Row>
      )} */}
      {platform === 'twitter' && (
        <>
          <Row
            gutter={[24, 0]}
            style={{
              justifyContent: 'center',
            }}>
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'social-media-audit-tw' ? 'active' : ''
                }`}
                onClick={() =>
                  history.push(`/analysis/${platform}/social-media-audit-tw`)
                }>
                1. Social Media Audit
              </div>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'create-post' ? 'active' : ''
                }`}
                onClick={() =>
                  history.push(`/analysis/${platform}/create-post`)
                }>
                2. Create Twitter Post
              </div>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'tweet-search' ? 'active' : ''
                }`}
                onClick={() =>
                  history.push(`/analysis/${platform}/tweet-search`)
                }>
                3. Tweet Search
              </div>
            </Col>
          </Row>
        </>
      )}
      {platform === 'web' && (
        <>
          <Row
            gutter={[24, 0]}
            style={{
              justifyContent: 'center',
            }}>
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'seo-analysis' ? 'active' : ''
                }`}
                onClick={() =>
                  history.push(`/analysis/${platform}/seo-analysis`)
                }>
                1. SEO Analysis
              </div>
            </Col>
            {/* <Col xs={24} sm={24} md={4} lg={4} xl={4}>
              <div
                className={`button-nav ${
                  pageActive === 'create-post' ? 'active' : ''
                }`}
                onClick={() =>
                  history.push(`/analysis/${platform}/create-post`)
                }>
                2. Create Twitter Post
              </div>
            </Col> */}
          </Row>
        </>
      )}
    </div>
  );
};
