import React from 'react'
import { Login } from 'react-admin'
import MyLoginForm from './ReactAdmin/LoginForm'

const MySignup = props => (
  <Login {...props}>
    <MyLoginForm />
  </Login>
)

export default MySignup
