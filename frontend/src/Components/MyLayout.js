import React, { forwardRef } from 'react'
import { AppBar, Layout, UserMenu, MenuItemLink } from 'react-admin'
import SettingsIcon from '@material-ui/icons/Settings'
import { getUserData } from '../authProvider'

const ProfileMenu = forwardRef(({ onClick }, ref) => {
  const userData = getUserData()

  return (
    <MenuItemLink
      ref={ref}
      to={`/User/${userData.id}`}
      primaryText="Profile"
      leftIcon={<SettingsIcon/>}
      onClick={onClick}
    />
  )
});

const MyUserMenu = props => (
  <UserMenu {...props}>
    <ProfileMenu />
  </UserMenu>
);

const MyAppBar = props => <AppBar {...props} userMenu={<MyUserMenu />} />
const MyLayout = props => <Layout {...props} appBar={MyAppBar} />

export default MyLayout
