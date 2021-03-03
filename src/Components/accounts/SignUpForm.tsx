import React from 'react';
import { useState, createRef } from "react";
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import { Redirect } from 'react-router-dom';

type UserState = {
    username: String,
    email: String,
    password: String,
    password2: String
}

const SignupForm = (props: any) => {
    
    const [userState, setUserState] = useState<UserState>({
        username: '',
        email: '',
        password: '',
        password2: '',
    })

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (userState.password !== userState.password2) {
          props.createMessage({ passwordNotMatch: 'Passwords do not match' });
        } else {
          props.register({userState});
        }
      };

    return <>
    {!props.isAuthenticated ? 
      <Form size="large" onSubmit={onSubmit}>
        <Form.Group css={{marginBottom: "16px !important"}}>
          <Form.Field width={16}>
            <label>Username</label>
                <Form.Input
                type="text"
                name="username"
                onChange={(_, { value }) => {
                    const trimmed = value.trim()
                    setUserState({ ...userState, username: trimmed })
                }}
                />
          </Form.Field>
        </Form.Group>
        <Form.Group css={{marginBottom: "16px !important"}}>
          <Form.Field width={16}>
            <label>Email</label>
                <Form.Input
                type="email"
                name="email"
                onChange={(_, { value }) => {
                    const trimmed = value.trim()
                    setUserState({ ...userState, email: trimmed })
                }}
                />
          </Form.Field>
        </Form.Group>
        <Form.Group css={{marginBottom: "16px !important"}}>
          <Form.Field width={16}>
            <label>Password</label>
                <Form.Input
                type="password"
                name="password"
                onChange={(_, { value }) => {
                    const trimmed = value.trim()
                    setUserState({ ...userState, password: trimmed })
                }}
                />
          </Form.Field>
        </Form.Group>
        <Form.Group css={{marginBottom: "16px !important"}}>
          <Form.Field width={16}>
            <label>Confirm Password</label>
                <Form.Input
                type="password"
                name="password2"
                onChange={(_, { value }) => {
                    const trimmed = value.trim()
                    setUserState({ ...userState, password2: trimmed })
                }}
                />
          </Form.Field>
        </Form.Group>
        <Form.Group>
            <Form.Field>
                <Form.Input
                type="submit"
                />
            </Form.Field>
        </Form.Group>
    </Form>
    :
    <Redirect to="/" />
    }
    </>
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(SignupForm);