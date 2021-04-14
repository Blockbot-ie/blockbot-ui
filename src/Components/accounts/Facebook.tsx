import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookSocialAuth extends Component {
  render() {
    const fbResponse = (response) => {
      console.log(response);
    }
    return (
      <div className="App">

        <FacebookLogin
          textButton="LOGIN WITH FACEBOOK"
          appId= "1169152186870794"
          fields="first_name, last_name, email"
          callback={fbResponse}
        />
      </div>
    );
  }
}

export default FacebookSocialAuth;