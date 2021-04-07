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
import { loadUser } from './actions/auth';
import Alerts from './Components/layout/Alerts';
import Main from './Components/settings/main';
import Dashboard from './Components/dashboard';
import PrivateRoute from './Components/common/PrivateRoute';
import userStoryMain from './Components/userStory/userStoryMain';
import ConnectExchange from './Components/strategies/ConnectExchange';
import Strategies from './Components/strategies/Strategies';

const App = (props: any) => {

  // Alert Options
  const alertOptions = {
    timeout: 7000
  };


  useEffect(() => {
    store.dispatch<any>(loadUser());
  })

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            {/* <Nav /> */}
            <Alerts />
            
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard}/>
                <Route path="/signup">
                  <SignupForm />
                </Route>
                <Route exact path="/login">
                  <LoginForm />
                </Route>
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
