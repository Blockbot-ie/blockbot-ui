import React from 'react';
import { useState, createRef } from "react";
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'

type UserState = {
    username: String,
    password: String
}

const SignupForm = (props: any) => {
    
    const [userState, setUserState] = useState<UserState>({
        username: '',
        password: ''
    })
    return <>
    <h1>Signup</h1>
      <Form size="large" onSubmit={e => props.handle_login(e, userState)}>
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