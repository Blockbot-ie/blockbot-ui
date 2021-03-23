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

const App = (props: any) => {

  // Alert Options
  const alertOptions = {
    timeout: 3000
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
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route path="/signup">
                  <SignupForm />
                </Route>
                <Route exact path="/login">
                  <LoginForm />
                </Route>
                <Route path="/settings" component={Main} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>

  );
}
export default App;
