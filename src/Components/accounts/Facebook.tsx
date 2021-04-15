import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import fbLoginService from './fbLoginService';

class FacebookSocialAuth extends Component {
  render() {

    const fbResponse = async (response)  => {
      fbLoginService(response.accessToken)
      console.log(response)
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