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
    password2: String
}

const SignupForm = (props: any) => {
    
    const [userState, setUserState] = useState<UserState>({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
    })

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (userState.password !== userState.password2) {
          props.createMessage({ passwordNotMatch: 'Passwords do not match' });
        } else {
          props.signup({ userState });
        }
      };

    return <>
  {!props.isAuthenticated ? 
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register an account with us
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setUserState({ ...userState, first_name: trimmed })}
                }
                id="first_name" name="first_name" type="text" autoComplete="first_name" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="First name" />
              </div>
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setUserState({ ...userState, last_name: trimmed })}
                }
                id="last_name" name="last_name" type="text" autoComplete="last_name" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Last name" />
              </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setUserState({ ...userState, username: trimmed })}
                }
                id="username" name="username" type="username" autoComplete="username" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Username" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setUserState({ ...userState, email: trimmed })}
                }
                id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setUserState({ ...userState, password: trimmed })}
                }
                id="password" name="password" type="password" autoComplete="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password" />
              </div>
            </div>

            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setUserState({ ...userState, password2: trimmed })}
                }
                id="password2" name="password2" type="password" autoComplete="password2" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Confirm Password" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
                <span className="px-2 bg-white text-gray-500">
                Already have an account?
                </span>
              </div>
            </div>
          </div>
          <div>
            <Link to="/login" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
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