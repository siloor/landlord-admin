import React, { Component } from 'react'
import { Admin, Resource } from 'react-admin'
import { createMuiTheme } from '@material-ui/core/styles'
import { deepPurple } from '@material-ui/core/colors'
import buildDataProvider from './dataProvider'
import authProvider from './authProvider'

import { UserCreate, UserEdit, UserList } from './users/index'

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
      <Admin dataProvider={dataProvider} authProvider={authProvider} theme={theme}>
        {permissions => [
          <Resource name='User' icon={People} list={UserList} edit={UserEdit} create={UserCreate} />
        ]}
      </Admin>
    )
  }
}

export default App
