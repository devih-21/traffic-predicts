import React, { useState, useEffect } from 'react';
import { apiChannelData } from '../../../api/getData';
import { Menu, Avatar } from 'antd';
import { NavLink, useLocation, useParams, useHistory } from 'react-router-dom';
import profilavatar from '../../../assets/images/face-1.jpg';

import './index.scss';

function Sidenav({ color }) {
  const param = useParams();
  const history = useHistory();
  const { pathname } = useLocation();
  const page = pathname.replace('/', '').replace('/', '-');
  const pageActive = pathname.split('/')[1];
  const [user, setUser] = useState(null);
  const loginType = sessionStorage.getItem('loginType');

  useEffect(async () => {
    if (loginType === 'google') {
      const data = await apiChannelData.getAll();

      if (data?.error || !data) {
        history.push('/sign-in');
      } else {
        setUser(data);
      }
    }
  }, []);

  const tiktok = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}>
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}></path>
    </svg>,
  ];

  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}></path>
    </svg>,
  ];

  return (
    <div className="nav-bar">
      <div className="brand">
        {/* <img src={logo} alt="" /> */}
        <img
          src={require('../../../assets/landing/logo.png').default}
          width={250}
          height={49}
        />
      </div>
      <div className="profile-user">
        <div className="user-avatar">
          <Avatar
            size={100}
            shape="square"
            src={user?.picture}
            style={{
              borderRadius: 100,
            }}
          />
          <div className="user-name">{user?.name}</div>
          <div
            className="direct-profile"
            onClick={() => history.push('/profile')}>
            Account Profile
          </div>
        </div>
      </div>
      <Menu theme="light" mode="inline" style={{ display: 'none' }}>
        <Menu.Item className="menu-item-header" key="about">
          About
        </Menu.Item>
        <Menu.Item key="dashboard">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === 'dashboard' ? color : '',
              }}>
              {tiktok}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="payment">
          <NavLink to="/payment">
            <span
              className="icon"
              style={{
                background: page === 'payment' ? color : '',
              }}>
              {tiktok}
            </span>
            <span className="label">Payment</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item className="menu-item-header" key="tiktok">
          Tiktok
        </Menu.Item>
        <Menu.Item key="tiktok-analysis">
          <NavLink to="/tiktok/analysis">
            <span
              className="icon"
              style={{
                background: page === 'tiktok-analysis' ? color : '',
              }}>
              {tiktok}
            </span>
            <span className="label">Tiktok</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item className="menu-item-header" key="youtube">
          Youtube
        </Menu.Item>
        <Menu.Item key="youtube-social-media-audit">
          <NavLink to="/youtube/social-media-audit">
            <span
              className="icon"
              style={{
                background: page === 'youtube-social-media-audit' ? color : '',
              }}>
              {tiktok}
            </span>
            <span className="label">Social Media Audit</span>
          </NavLink>
        </Menu.Item>{' '}
        <Menu.Item key="youtube-video-analysis">
          <NavLink to="/youtube/video-analysis">
            <span
              className="icon"
              style={{
                background: page === 'youtube-video-analysis' ? color : '',
              }}>
              {tiktok}
            </span>
            <span className="label">Video Analysis</span>
          </NavLink>
        </Menu.Item>{' '}
        <Menu.Item key="youtube-video-formula-search">
          <NavLink to="/youtube/video-formula-search">
            <span
              className="icon"
              style={{
                background:
                  page === 'youtube-video-formula-search' ? color : '',
              }}>
              {tiktok}
            </span>
            <span className="label">Video Formula Search</span>
          </NavLink>
        </Menu.Item>{' '}
        <Menu.Item key="youtube-content-creation">
          <NavLink to="/youtube/content-creation">
            <span
              className="icon"
              style={{
                background: page === 'youtube-content-creation' ? color : '',
              }}>
              {tiktok}
            </span>
            <span className="label">Content Creation</span>
          </NavLink>
        </Menu.Item>{' '}
        <Menu.Item key="youtube-script-suggestion">
          <NavLink to="/youtube/script-suggestion">
            <span
              className="icon"
              style={{
                background: page === 'youtube-script-suggestion' ? color : '',
              }}>
              {tiktok}
            </span>
            <span className="label">Script Suggestion</span>
          </NavLink>
        </Menu.Item>{' '}
        <Menu.Item key="youtube-audience-analysis">
          <NavLink to="/youtube/audience-analysis">
            <span
              className="icon"
              style={{
                background: page === 'youtube-audience-analysis' ? color : '',
              }}>
              {tiktok}
            </span>
            <span className="label">Audience Analysis</span>
          </NavLink>
        </Menu.Item>{' '}
        <Menu.Item key="youtube-testing">
          <NavLink to="/youtube/testing">
            <span
              className="icon"
              style={{
                background: page === 'youtube-testing' ? color : '',
              }}>
              {tiktok}
            </span>
            <span className="label">A/B Testing</span>
          </NavLink>
        </Menu.Item>{' '}
        <Menu.Item key="youtube-competitive-analysis">
          <NavLink to="/youtube/competitive-analysis">
            <span
              className="icon"
              style={{
                background:
                  page === 'youtube-competitive-analysis' ? color : '',
              }}>
              {tiktok}
            </span>
            <span className="label">Competitive Analysis</span>
          </NavLink>
        </Menu.Item>{' '}
        <Menu.Item key="youtube-video-creation">
          <NavLink to="/youtube/video-creation">
            <span
              className="icon"
              style={{
                background: page === 'youtube-video-creation' ? color : '',
              }}>
              {tiktok}
            </span>
            <span className="label">Video Creation</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="5">
          Account
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === 'profile' ? color : '',
              }}>
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
      </Menu>
      <div className="nav-page">
        <div
          className={`button-nav ${pageActive === 'dashboard' ? 'active' : ''}`}
          onClick={() => history.push('/dashboard')}>
          Dashboard
        </div>
        <div
          className={`button-nav ${pageActive === 'analysis' ? 'active' : ''}`}
          onClick={() => history.push('/analysis/youtube/social-media-audit')}>
          Analysis
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
