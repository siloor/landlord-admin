import React from 'react'
import { Login } from 'react-admin'
import MyLoginForm from './ReactAdmin/LoginForm'

const MyLogin = props => (
  <Login {...props}>
    <MyLoginForm />
  </Login>
)

export default MyLogin
