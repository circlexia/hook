// https://reactjs.org/docs/javascript-environment-requirements.html
// React 16 depends on the collection types Map and Set.
// A polyfilled environment for React 16 using core-js to support older browsers
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import { Provider } from 'mobx-react';
import {Walk } from './containers';
import {WalkNav } from './containers';
// import store from './store/index';
import {getUrlParams} from './util/getUrlParams';
// store.DeviceState.setDeviceState(urlParamsObj.mac ? urlParamsObj.mac.toLowerCase() : '',urlParamsObj.mac,urlParamsObj.typeId,urlParamsObj.userId,urlParamsObj.deviceModel);

ReactDOM.render(<Provider>
  <HashRouter>
    <div>
      
      <Route path="/" exact component={Walk} />
      <Route path="/walknav" component={WalkNav} />
    </div>
  </HashRouter>
</Provider>, document.getElementById('root'));
