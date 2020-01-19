import React, { forwardRef, Fragment, useEffect, useState } from 'react'
import { AppBar, Layout, UserMenu, MenuItemLink, Sidebar, usePermissions } from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import Typography from '@material-ui/core/Typography'
import { getUserData } from '../authProvider'
import { getPropertyId } from '../dataProvider'
import getGraphqlClient from '../graphqlClient'
import MyMenu from './ReactAdmin/Menu'

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

const useAppBarStyles = () => {
  const styles = {
    title: {
      flex: 1,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }

  return makeStyles(styles)()
}

const MyTitle = ({ propertyId }) => {
  const [propertyName, setPropertyName] = useState(null)

  useEffect(
    () => {
      if (!propertyId) {
        setPropertyName(null)

        return
      }

      const graphQLClient = getGraphqlClient()

      const query = `query Property($id: ID!) {
        data: Property(id: $id) { name }
      }`

      const variables = { id: propertyId }

      graphQLClient.request(query, variables).then(data => {
        setPropertyName(data.data ? data.data.name : null)
      })
    },
    [ propertyId ]
  )

  return propertyName ? `${propertyName} - ` : ''
}

const MyAppBar = props => {
  const classes = useAppBarStyles()

  return (
    <AppBar {...props} userMenu={<MyUserMenu />}>
      <Typography
        variant="h6"
        color="inherit"
        className={classes.title}
        id="react-admin-title"
      >
        <MyTitle propertyId={getPropertyId()} />
      </Typography>
    </AppBar>
  )
}

const MyLayout = props => <Layout {...props} appBar={MyAppBar} sidebar={MySidebar} menu={MyMenu} />

export default MyLayout
