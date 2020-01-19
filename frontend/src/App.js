import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Admin, Resource } from 'react-admin'
import { createMuiTheme } from '@material-ui/core/styles'
import { deepPurple } from '@material-ui/core/colors'
import People from '@material-ui/icons/People'

import buildDataProvider, { propertyRoutePrefix } from './dataProvider'
import authProvider from './authProvider'
import MyLayout from './Components/MyLayout'
import MyLogin from './Components/MyLogin'
import Dashboard from './Components/Dashboard'
import PropertyDashboard from './Components/PropertyDashboard'
import { UserCreate, UserEdit, UserList } from './Components/Users'
import { PropertyCreate, PropertyEdit, PropertyList } from './Components/Properties'

const theme = createMuiTheme({
  palette: {
    secondary: deepPurple
  }
})

const customRoutes = [
  <Route exact path={`/${propertyRoutePrefix}Dashboard`} component={PropertyDashboard} />
];

class App extends Component {
  constructor () {
    super()

    this.state = { dataProvider: null }
  }

  async componentDidMount () {
    const dataProvider = await buildDataProvider()

    this.setState({ dataProvider })
  }

  render () {
    const { dataProvider } = this.state

    if (!dataProvider) {
      return <div>Loading</div>
    }

    return (
      <Admin dataProvider={dataProvider} authProvider={authProvider} theme={theme} dashboard={Dashboard} layout={MyLayout} customRoutes={customRoutes} loginPage={MyLogin}>
        {permissions => [
          <Resource name={'User'} icon={People} list={permissions === 'admin' ? UserList : null} edit={UserEdit} create={permissions === 'admin' ? UserCreate : null} />,
          <Resource name='Property' list={PropertyList} edit={PropertyEdit} create={PropertyCreate} />
        ]}
      </Admin>
    )
  }
}

export default App
