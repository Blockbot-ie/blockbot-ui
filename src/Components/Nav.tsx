import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


const Nav = (props: any) => {
    const logged_out_nav = (

        <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        </ul>
    );
  
    const logged_in_nav = (
        <ul>
        <li><Link to="/logout">Logout</Link></li>
        </ul>
    );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;
