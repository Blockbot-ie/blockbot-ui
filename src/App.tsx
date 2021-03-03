import React, { Fragment, useEffect, useState } from 'react';
import Nav from './Components/Nav';
import LoginForm from './Components/accounts/LoginForm';
import SignupForm from './Components/accounts/SignUpForm';
import './App.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Strategies from './Components/strategies/Strategies';
import ConnectExhange from './Components/strategies/ConnectExchange';
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

  return (
    <Provider store={store}>
        <Router>
          <Fragment>
            <Nav />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Strategies} />
                <Route exact path="/signup">
                  <SignupForm />
                </Route>
                <Route exact path="/login">
                  <LoginForm />
                </Route>
                
                <Route exact path="/connect_exchange">
                  <ConnectExhange />
                </Route>
              </Switch>
            </div>
          </Fragment>
        </Router>
    </Provider>

  );
}
export default App;
