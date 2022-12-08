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
import { Switch, Route, Redirect } from 'react-router-dom';

import { Landing } from './pages/Landing/Landing';

import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
