import React from 'react';
import { useState, createRef } from "react";
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import { Link, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

type UserState = {
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    re_password: String
}

const SignupForm = (props: any) => {
    
    const [userState, setUserState] = useState<UserState>({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
    })

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (userState.password !== userState.re_password) {
          props.createMessage({ passwordNotMatch: 'Passwords do not match' });
        } else {
          props.signup(userState.first_name, userState.last_name, userState.email, userState.username, userState.password, userState.re_password);
          <Redirect to="/login" />
        }
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
              <label htmlFor="first_name" className="block text-sm font-medium text-white">
                First Name
              </label>
              <div className="mt-1">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setUserState({ ...userState, first_name: trimmed })}
                }
                id="first_name" name="first_name" type="text" autoComplete="first_name" required className="appearance-none block w-full px-3 py-2 border-0 rounded-md shadow-sm placeholder-gray-400 bg-gray-800 focus:outline-none focus:ring-indigo-500 sm:text-sm text-white" placeholder="First name" />
              </div>
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-white">
                Last Name
              </label>
              <div className="mt-1">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setUserState({ ...userState, last_name: trimmed })}
                }
                id="last_name" name="last_name" type="text" autoComplete="last_name" required className="appearance-none block w-full px-3 py-2 bg-gray-800 border-0 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 sm:text-sm text-white" placeholder="Last name" />
              </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Username
              </label>
              <div className="mt-1">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setUserState({ ...userState, username: trimmed })}
                }
                id="username" name="username" type="username" autoComplete="username" required className="appearance-none block w-full px-3 py-2 bg-gray-800 border-0 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 sm:text-sm text-white" placeholder="Username" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <div className="mt-1">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setUserState({ ...userState, email: trimmed })}
                }
                id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 bg-gray-800 border-0 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" placeholder="Email" />
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

            <div>
              <label htmlFor="re_password" className="block text-sm font-medium text-white">
                Confirm Password
              </label>
              <div className="mt-1">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setUserState({ ...userState, re_password: trimmed })}
                }
                id="re_password" name="re_password" type="password" autoComplete="re_password" required className="appearance-none block w-full px-3 py-2 bg-gray-800 border-0 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" placeholder="Confirm Password" />
              </div>
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border-0 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              { props.isLoading ? <Loader type="Circles" color="#00BFFF" height={24} width={24}/> : <span>Sign Up</span>}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-700 text-white">
                Already have an account?
                </span>
              </div>
            </div>
          </div>
          <div>
            <Link to="/login" className="w-full inline-flex justify-center py-2 px-4 mt-2 rounded-md shadow-sm text-white bg-indigo-600 text-sm font-medium hover:bg-indigo-700">
            Sign in
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup, createMessage })(SignupForm);