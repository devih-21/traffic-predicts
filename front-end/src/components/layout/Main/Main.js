import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Drawer, Affix } from 'antd';
import { apiChannelData } from '../../../api/getData';
import Sidenav from '../NavBar/Sidenav';

import './index.scss';

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const history = useHistory();
  const location = useLocation();
  const [pathname, setPathname] = useState('');
  const currentPlatform = pathname.split('/')[2];
  const [sidenavColor, setSidenavColor] = useState('#1890ff');
  const [sidenavType, setSidenavType] = useState('transparent');

  useEffect(() => window.scrollTo(0, 0));

  useEffect(() => {
    const { pathname } = location;
    setPathname(pathname);
    window.scrollTo(0, 0);
  }, [location]);

  const pushPlatform = (platform) => {
    const list = pathname.split('/');

    history.push(`/${list[1]}/${platform}/${list[3]}`);
  };

  return (
    <>
      <div className="bg-layout"></div>
      <Layout className="layout-dashboard layout-profile">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          trigger={null}
          width={300}
          theme="light"
          className={`sider-primary ant-layout-sider-primary ${
            sidenavType === '#fff' ? 'active-route' : ''
          }`}
          style={{ background: sidenavType }}>
          <Sidenav color={sidenavColor} />
        </Sider>
        <Layout>
          <div className="wrap-content">
            {pathname.includes('analysis') && (
              <div className="feature-tab">
                {/* <div
                  className={`platform ${
                    currentPlatform === 'instagram' ? 'active' : ''
                  }`}
                  onClick={() => pushPlatform('instagram')}>
                  Instagram
                </div>
                <div
                  className={`platform ${
                    currentPlatform === 'facebook' ? 'active' : ''
                  }`}
                  onClick={() => pushPlatform('facebook')}>
                  Facebook
                </div>
                <div
                  className={`platform ${
                    currentPlatform === 'twitter' ? 'active' : ''
                  }`}
                  onClick={() => pushPlatform('twitter')}>
                  Twitter
                </div>
                <div
                  className={`platform ${
                    currentPlatform === 'linkedin' ? 'active' : ''
                  }`}
                  onClick={() => pushPlatform('linkedin')}>
                  Linkedin
                </div> */}
                <div
                  className={`platform ${
                    currentPlatform === 'youtube' ? 'active' : ''
                  }`}
                  onClick={() =>
                    history.push('/analysis/youtube/social-media-audit')
                  }>
                  Youtube
                </div>
                {/* <div
                  className={`platform ${
                    currentPlatform === 'tiktok' ? 'active' : ''
                  }`}
                  onClick={() => history.push('/analysis/tiktok/analysis')}>
                  Tiktok
                </div> */}
                <div
                  className={`platform ${
                    currentPlatform === 'create-mode' ? 'active' : ''
                  }`}
                  onClick={() => history.push('/analysis/create-mode/create')}>
                  Create
                </div>
                <div
                  className={`platform ${
                    currentPlatform === 'trending' ? 'active' : ''
                  }`}
                  onClick={() => history.push('/analysis/trending/suggest')}>
                  Trending
                </div>
                <div
                  className={`platform ${
                    currentPlatform === 'twitter' ? 'active' : ''
                  }`}
                  onClick={() =>
                    history.push('/analysis/twitter/social-media-audit-tw')
                  }>
                  Twitter
                </div>
                <div
                  className={`platform ${
                    currentPlatform === 'web' ? 'active' : ''
                  }`}
                  onClick={() => history.push('/analysis/web/seo-analysis')}>
                  Website
                </div>
              </div>
            )}
            {pathname === '/dashboard' && (
              <div className="wrap-tag-analysis">
                <div className="tag-dashboard">Dashboard</div>
              </div>
            )}
            <Content className="content-ant">{children}</Content>
          </div>
        </Layout>
      </Layout>
    </>
  );
}

export default Main;
