import React, { Fragment, useEffect, useState } from 'react';
import Nav from './Components/Nav';
import LoginForm from './Components/accounts/LoginForm';
import SignupForm from './Components/accounts/SignUpForm';
import './App.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import Strategies from './Components/strategies/Strategies';
import ConnectExhange from './Components/strategies/ConnectExchange';
import PrivateRoute from './Components/common/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import Alerts from './Components/layout/Alerts';
import Main from './Components/settings/main';

type AuthUser = {
  displayed_form: String,
  logged_in: Boolean,
  username: String
}

type UserState = {
  username: String,
  password: String
}

const App = () => {

  // Alert Options
  const alertOptions = {
    timeout: 3000,
    position: 'top center',
  };

  const [authUserState, setAuthUserState] = useState<AuthUser>({
    displayed_form: '',
    logged_in: localStorage.getItem('token') ? true: false,
    username: ''
  })


  useEffect(() => {
    store.dispatch<any>(loadUser());
  })

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            <Nav />
            <Alerts />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/get-started" component={Main} />
                <Route exact path="/signup">
                  <SignupForm />
                </Route>
                <Route exact path="/login">
                  <LoginForm />
                </Route>
                
                <Route exact path="/settings">
                  <Main />
                </Route>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>

  );
}
export default App;
