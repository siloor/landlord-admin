import React, { Component } from 'react'
import { Admin, Resource } from 'react-admin'
import { createMuiTheme } from '@material-ui/core/styles'
import { deepPurple } from '@material-ui/core/colors'
import buildDataProvider from './dataProvider'
import authProvider from './authProvider'

import Dashboard from './dashboard/index'
import { UserCreate, UserEdit, UserList } from './users/index'
import { PropertyCreate, PropertyEdit, PropertyList } from './properties/index'

import People from '@material-ui/icons/People'

const theme = createMuiTheme({
  palette: {
    secondary: deepPurple
  }
})

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
      <Admin dataProvider={dataProvider} authProvider={authProvider} theme={theme} dashboard={Dashboard}>
        {permissions => [
          <Resource name='User' icon={People} list={UserList} edit={UserEdit} create={UserCreate} />,
          <Resource name='Property' list={PropertyList} edit={PropertyEdit} create={PropertyCreate} />
        ]}
      </Admin>
    )
  }
}

export default App
