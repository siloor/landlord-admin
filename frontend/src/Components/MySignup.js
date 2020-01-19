import React from 'react'
import { Login } from 'react-admin'
import SignupForm from './ReactAdmin/SignupForm'

const MySignup = props => (
  <Login {...props}>
    <SignupForm />
  </Login>
)

export default MySignup
