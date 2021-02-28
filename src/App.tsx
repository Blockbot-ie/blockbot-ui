import React, { useEffect, useState } from 'react';
import Nav from './Components/Nav';
import LoginForm from './Components/accounts/LoginForm';
import SignupForm from './Components/accounts/SignUpForm';
import axios from 'axios';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from "react-router-dom";
import Strategies from './Components/strategies/Strategies';
import ConnectStrategy from './Components/strategies/ConnectStrategy';

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

  const history = useHistory()

  const [authUserState, setAuthUserState] = useState<AuthUser>({
    displayed_form: '',
    logged_in: localStorage.getItem('token') ? true: false,
    username: ''
  })


  useEffect(() => {
    
    if (authUserState.logged_in) {
      axios.get('http://localhost:8000/bb/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          const user = res.data;
          setAuthUserState({...authUserState, username: user.username})
        })
    } else {
      loginScreen()
    }
  }, [authUserState.logged_in])

  const loginScreen = () => {
    return <Redirect to="/login"/>
  }

  const handle_login = (e: any, data: UserState) => {
    e.preventDefault();
    axios.post('http://localhost:8000/token-auth/', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        const token = res.data;
        localStorage.setItem('token', token.token);
        setAuthUserState({
          ...authUserState,
          logged_in: true,
          displayed_form: '',
          username: token.user.username
        })
        return <Redirect to="/"/>
      })
      .catch(function (error) {
        console.log(error);
      });;
      
  };

  const handle_signup = (e: any, data: UserState) => {
    e.preventDefault();
    axios.post('http://localhost:8000/bb/users/', JSON.stringify(data),  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        const user = res.data;
        localStorage.setItem('token', user.token);
        setAuthUserState({
          ...authUserState,
          logged_in: true,
          displayed_form: '',
          username: user.user.username
        })
      });

      return <Redirect to="/"/>
  };

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
    
    <Router>
      <div className="App">
      <Nav
        logged_in={authUserState.logged_in}
      />
        
      <Switch>
        <Route exact path="/">
        <h3>
          {authUserState.logged_in
            ? `Hello, ${authUserState.username}`
            : 'Please Log In'}
        </h3>
        </Route>
        <Route exact path="/login">
          <LoginForm handle_login={handle_login} logged_in={authUserState.logged_in} />
        </Route>
        
        <Route exact path="/signup">
            <SignupForm handle_signup={handle_signup} />
        </Route>
        <Route exact path="/logout">
          {handle_logout}
        </Route>
        <Route exact path="/strategies">
          <Strategies authUserState={authUserState} />
        </Route>
        <Route path="/strategy/:id" render={(props) => 
          <ConnectStrategy logged_in={authUserState.logged_in} {...props} />}/>
      </Switch>
    </div>
    </Router>
  );
}
export default App;
