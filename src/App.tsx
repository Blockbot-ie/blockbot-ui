import React, { Fragment, useEffect, useState } from 'react';
import Nav from './Components/Nav';
import LoginForm from './Components/accounts/LoginForm';
import SignupForm from './Components/accounts/SignUpForm';
import axios from 'axios';
import './App.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import Strategies from './Components/strategies/Strategies';
import ConnectStrategy from './Components/strategies/ConnectStrategy';
import { Header } from 'semantic-ui-react';
import PrivateRoute from './Components/common/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

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


  const [authUserState, setAuthUserState] = useState<AuthUser>({
    displayed_form: '',
    logged_in: localStorage.getItem('token') ? true: false,
    username: ''
  })


  useEffect(() => {
    store.dispatch<any>(loadUser());
  })

  const loginScreen = () => {
    return <Redirect to="/login"/>
  }

  const handle_logout = () => {
    localStorage.removeItem('token');
    setAuthUserState({
      ...authUserState,
      logged_in: false,
      username: ''
    })
    return <Redirect to="/"/>
  };
  return (
    <Provider store={store}>
        <Router>
          <Fragment>
            <Nav logged_in={authUserState.logged_in} />  
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Strategies} />
                <Route exact path="/signup">
                  <SignupForm />
                </Route>
                <Route exact path="/login">
                  <LoginForm />
                </Route>
                <Route exact path="/logout">
                  {handle_logout}
                </Route>
              </Switch>
            </div>
          </Fragment>
        </Router>
    </Provider>

  );
}
export default App;
