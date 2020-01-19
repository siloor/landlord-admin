import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Admin, Resource } from 'react-admin'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import englishMessages from 'ra-language-english'
import { createMuiTheme } from '@material-ui/core/styles'
import { deepPurple } from '@material-ui/core/colors'
import People from '@material-ui/icons/People'
import _ from 'lodash'

import buildDataProvider, { propertyRoutePrefix } from './dataProvider'
import authProvider from './authProvider'
import MyLayout from './Components/MyLayout'
import MyLogin from './Components/MyLogin'
import MySignup from './Components/MySignup'
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
  <Route exact path={`/${propertyRoutePrefix}Dashboard`} component={PropertyDashboard} />,
  <Route exact path={`/signup`} component={MySignup} noLayout />
]

const messages = {
  en: _.merge(englishMessages, {
    ra: {
      auth: {
        email: 'Email',
        sign_up: 'Sign up',
        sign_up_link: 'Create an account'
      }
    }
  })
}

const i18nProvider = polyglotI18nProvider(locale => messages[locale])

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
      <Admin dataProvider={dataProvider} authProvider={authProvider} theme={theme} dashboard={Dashboard} layout={MyLayout} customRoutes={customRoutes} loginPage={MyLogin} i18nProvider={i18nProvider}>
        {permissions => [
          <Resource name={'User'} icon={People} list={permissions === 'admin' ? UserList : null} edit={UserEdit} create={permissions === 'admin' ? UserCreate : null} />,
          <Resource name='Property' list={PropertyList} edit={PropertyEdit} create={PropertyCreate} />
        ]}
      </Admin>
    )
  }
}

export default App
