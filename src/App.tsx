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
import userStoryMain from './Components/userStory/userStoryMain';
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
            <Nav />
            <Alerts />
              <Switch>
                <Route path="/user-story" component={userStoryMain} />
                <Route path="/signup" component={SignupForm} />
                <Route exact path="/login" component={LoginForm} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                <Route exact path='/activate/:uid/:token' component={Activate} />
                <Route exact path='/google' component={Google} />
                <Route exact path='/facebook' component={Facebook} />
              </Switch>
            
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>

  );
}
export default App;
