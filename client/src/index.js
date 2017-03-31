import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './App';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';

import NotFound from './NotFound';

import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="signup" component={Signup} />
            <Route path="login" component={Login} />
            <Route path="profile" component={Profile} />
            <Route path="*" component={NotFound} />
        </Route>

    </Router>,
  document.getElementById('root')
);
