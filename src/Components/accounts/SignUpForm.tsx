import React from 'react';
import { useState, createRef } from "react";
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'

type UserState = {
    username: String,
    email: String,
    password1: String,
    password2: String
}

const SignupForm = (props: any) => {
    
    const [userState, setUserState] = useState<UserState>({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (userState.password1 !== userState.password2) {
          props.createMessage({ passwordNotMatch: 'Passwords do not match' });
        } else {
          props.register({userState});
        }
      };

    return <>
    <h1>Signup</h1>
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
                name="password1"
                onChange={(_, { value }) => {
                    const trimmed = value.trim()
                    setUserState({ ...userState, password1: trimmed })
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
    </>
}
export default SignupForm;