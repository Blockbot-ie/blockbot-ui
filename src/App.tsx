import { useEffect, useState } from 'react';
import Nav from './Components/Nav';
import LoginForm from './Components/accounts/LoginForm';
import SignupForm from './Components/accounts/SignUpForm';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from "react-router-dom";

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
    console.log(authUserState.logged_in)
    if (authUserState.logged_in) {
      fetch('http://localhost:8000/bb/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          setAuthUserState({...authUserState, username: json.username });
        });
    }
  }, [authUserState.logged_in])

  const handle_login = (e: any, data: UserState) => {
    console.log('Hello')
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setAuthUserState({
          ...authUserState,
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        })
        return <Redirect to="/"/>
      });
      
  };

  const handle_signup = (e: any, data: UserState) => {
    e.preventDefault();
    fetch('http://localhost:8000/bb/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setAuthUserState({
          ...authUserState,
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        })
      });

      return <Redirect to="/"/>
  };

  const handle_logout = () => {
    console.log('Hi')
    localStorage.removeItem('token');
    setAuthUserState({
      ...authUserState,
      logged_in: false,
      username: ''
    })
    return <Redirect to="/"/>
  };

  const display_form = (form: String) => {
    setAuthUserState({
      ...authUserState,
      displayed_form: form
    })
  };   
  return (
    
    <Router>
      <div className="App">
      <Nav
        logged_in={authUserState.logged_in}
      />
      <Switch>
        <Route exact path="/">
          <h1>hey</h1>
        </Route>
        <Route exact path="/login">
          <LoginForm handle_login={handle_login} logged_in={authUserState.logged_in} />
        </Route>
        
        <Route path="/signup">
            <SignupForm handle_signup={handle_signup} />
        </Route>
        <Route path="/logout">
          {handle_logout}
        </Route>
        </Switch>
      <h3>
        {authUserState.logged_in
          ? `Hello, ${authUserState.username}`
          : 'Please Log In'}
      </h3>

    </div>
    </Router>
  );
}
export default App;
