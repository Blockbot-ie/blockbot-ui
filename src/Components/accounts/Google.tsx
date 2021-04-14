import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import googleLoginService from './googleLoginService';

class GoogleSocialAuth extends Component {

  render() {
    const googleResponse = async (response)  => {
        googleLoginService(response.accessToken)
      console.log(response)
    }
    return (
      <div className="App">
      
        <GoogleLogin
          clientId="937404097485-5csvq7gt7jr9lv6iam3lpt0kfragmjd0.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={googleResponse}
          onFailure={googleResponse}
        />
      </div>
    );
  }
}

export default GoogleSocialAuth;