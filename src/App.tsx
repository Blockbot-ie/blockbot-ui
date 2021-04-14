import React, { Fragment, useEffect, useState } from 'react';
import Nav from './Components/Nav';
import LoginForm from './Components/accounts/LoginForm';
import SignupForm from './Components/accounts/SignUpForm';
import './App.css';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import store from './store';
import { checkAuthenticated ,loadUser } from './actions/auth';
import Alerts from './Components/layout/Alerts';
import Main from './Components/settings/main';
import Dashboard from './Components/dashboard';
import PrivateRoute from './Components/common/PrivateRoute';
import userStoryMain from './Components/userStory/userStoryMain';
import ConnectExchange from './Components/strategies/ConnectExchange';
import Strategies from './Components/strategies/Strategies';
import ResetPassword from './Components/accounts/ResetPassword';
import ResetPasswordConfirm from './Components/accounts/ResetPasswordConfirm';
import Activate from './Components/accounts/Activate';
import Google from './Components/accounts/Google';
import Facebook from './Components/accounts/Facebook';

const App = (props: any) => {

  // Alert Options
  const alertOptions = {
    timeout: 7000
  };


  useEffect(() => {
    store.dispatch<any>(loadUser());
    store.dispatch<any>(checkAuthenticated());
  })

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            <Alerts />
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard}/>
                <Route path="/signup" component={SignupForm} />
                <Route exact path="/login" component={LoginForm} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                <Route exact path='/activate/:uid/:token' component={Activate} />
                <Route exact path='/google' component={Google} />
                <Route exact path='/facebook' component={Facebook} />
                <PrivateRoute path="/user-story" component={userStoryMain} />
                <PrivateRoute path="/exchanges" component={ConnectExchange} />
                <PrivateRoute path="/strategies" component={Strategies} />
                <Route path="/settings" component={Main} />
              </Switch>
            
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>

  );
}
export default App;
