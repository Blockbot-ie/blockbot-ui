import React from 'react';
import { useState } from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import '../../fontawesome';
import Loader from 'react-loader-spinner';
import GoogleSocialAuth from './Google';
import FacebookSocialAuth from './Facebook';

type UserState = {
    username: String,
    password: String
}

const LoginForm = (props: any) => {
    
    const [userState, setUserState] = useState<UserState>({
        username: '',
        password: ''
    })

    const onSubmit = (e: any) => {
        e.preventDefault(); 
        props.login(userState.username, userState.password);
      };
    return <>
    {!props.isAuthenticated ? 
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 className="font-mono text-indigo-500 text-center">My BlockBot</h1>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
            </h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-gray-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-white">
                        Username or email
                        </label>
                        <div className="mt-1">
                            <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                const trimmed = e.target.value.trim()
                                setUserState({ ...userState, username: trimmed })}
                            }
                            id="username" name="username" type="username" autoComplete="username" required className="appearance-none block w-full px-3 py-2 bg-gray-800 border-0 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" placeholder="Username" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">
                        Password
                        </label>
                        <div className="mt-1">
                            <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                const trimmed = e.target.value.trim()
                                setUserState({ ...userState, password: trimmed })}
                            }
                            id="password" name="password" type="password" autoComplete="password" required className="appearance-none block w-full px-3 py-2 bg-gray-800 border-0 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" placeholder="Password" />
                        </div>
                    </div>
                    <div className="flex float-right mb-2">
                        <div className="text-sm">
                            <Link to="/reset-password" className="font-medium text-white hover:text-indigo-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button disabled={props.isLoading} type="submit" className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        { props.isLoading ? <Loader type="Circles" color="#00BFFF" height={24} width={24}/> : <span>Sign In</span>}
                        </button>
                    </div>
                </form>
                
                <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-700 text-white">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <FacebookSocialAuth />
              </div>

              <div>
              <GoogleSocialAuth />
              </div>
            </div>
            </div>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-700 text-white">
                            Don't have an account yet?
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <Link to="/signup" className="w-full inline-flex justify-center py-2 px-4 mt-2 rounded-md shadow-sm text-white bg-indigo-600 text-sm font-medium hover:bg-indigo-700">
                    Sign up
                    </Link>
                </div>
            </div>
        </div>
    </div>
    :
    <Redirect to="/" />
    }
    </> 
}
const mapStateToProps = (state ) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
  });
  
export default connect(mapStateToProps, { login })(LoginForm);


