import GoogleLogin from 'react-google-login';
import { googleLogin } from '../../actions/auth';
import { connect } from 'react-redux';

const GoogleSocialAuth = (props: any) =>  {

    const googleResponse = async (response)  => {
        props.googleLogin(response.accessToken)
    }
    return <>
      <div className="App">
      
        <GoogleLogin
          clientId="937404097485-5csvq7gt7jr9lv6iam3lpt0kfragmjd0.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={googleResponse}
          onFailure={googleResponse}
        />
      </div>
    </>
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

export default connect(mapStateToProps, { googleLogin, })(GoogleSocialAuth);