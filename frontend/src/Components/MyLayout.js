import React, { forwardRef, Fragment } from 'react'
import { AppBar, Layout, UserMenu, MenuItemLink, Sidebar, usePermissions } from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import { getUserData } from '../authProvider'

const useSidebarStyles = (permissions) => {
  const styles = {}

  if (permissions === 'user') {
    styles.drawerPaper = {
      '& a[href="#/Property"]': {
        display: 'none'
      }
    }
  }

  return makeStyles(styles)()
}

const MySidebar = props => {
  const { permissions } = usePermissions()
  const classes = useSidebarStyles(permissions)

  return <Sidebar classes={classes} {...props} />
}

const ProfileMenu = forwardRef(({ onClick }, ref) => {
  const userData = getUserData()

  return (
    <Fragment>
      <MenuItemLink
        ref={ref}
        to={`/User/${userData.id}`}
        primaryText="Profile"
        leftIcon={<SettingsIcon/>}
        onClick={onClick}
      />
      <MenuItemLink
        ref={ref}
        to={`/Property`}
        primaryText="Properties"
        leftIcon={<SettingsIcon/>}
        onClick={onClick}
      />
    </Fragment>
  )
})

const MyUserMenu = props => (
  <UserMenu {...props}>
    <ProfileMenu />
  </UserMenu>
)

const MyAppBar = props => <AppBar {...props} userMenu={<MyUserMenu />} />
const MyLayout = props => <Layout {...props} appBar={MyAppBar} sidebar={MySidebar} />

export default MyLayout
