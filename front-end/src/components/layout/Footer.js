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

import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';

function Footer() {
  const history = useHistory();
  const { Footer } = Layout;

  return (
    <Footer className="footer-component">
      <Menu mode="horizontal">
        <Menu.Item onClick={() => history.push('/features')}>Feature</Menu.Item>
        <Menu.Item onClick={() => history.push('/privacy-policy')}>
          Privacy Policy
        </Menu.Item>
        <Menu.Item onClick={() => history.push('/terms-of-service')}>
          Terms of Service
        </Menu.Item>
        <Menu.Item onClick={() => history.push('/letter-of-intent')}>
          Letter Of Intent
        </Menu.Item>
        <Menu.Item onClick={() => history.push('/registration')}>
          Registration
        </Menu.Item>
        <Menu.Item onClick={() => history.push('/sign-in')}>Sign In</Menu.Item>
      </Menu>
    </Footer>
  );
}

export default Footer;
