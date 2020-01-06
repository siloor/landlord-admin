import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { Title } from 'react-admin'

class Dashboard extends Component {
  render () {
    return (
      <Card>
        <Title title='Dashboard' />
        <CardHeader title={'Welcome to Landlord Admin'} />
        <CardContent>
          Welcome
        </CardContent>
      </Card>
    )
  }
}

export default Dashboard
