import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { facebookLogin } from '../../actions/auth';
import { connect } from 'react-redux';

const FacebookSocialAuth = (props: any) => {
  
    const fbResponse = async (response)  => {
      props.facebookLogin(response.accessToken)
      console.log(response)
  }
    return <>
      <div className="App">

        <FacebookLogin
          textButton="LOGIN WITH FACEBOOK"
          appId= "1169152186870794"
          fields="first_name, last_name, email"
          callback={fbResponse}
        />
      </div>
    </> 
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { facebookLogin, })(FacebookSocialAuth);