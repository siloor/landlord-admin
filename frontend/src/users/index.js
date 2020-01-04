import React from 'react'
import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, DisabledInput, TextInput, SelectField, SelectInput } from 'react-admin'
import { apiIntrospection } from '../dataProvider'
import _ from 'lodash'

const getAllowedRoles = () => {
  if (apiIntrospection.introspection === null) {
    return []
  }

  const userRoles = _.find(apiIntrospection.introspection.types, function (o) { return o.name === 'UserRoles' }).enumValues
  const results = []

  for (const role of userRoles) {
    results.push({ id: role.name, name: role.name })
  }

  return results
}

export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='id' />
      <TextField source='username' />
      <TextField source='email' />
      <SelectField source='role' choices={getAllowedRoles()} />
      <EditButton basePath='/User' />
    </Datagrid>
  </List>
)

const UserName = ({ record }) => {
  return <span>User {record ? `"${record.username}"` : ''}</span>
}

export const UserEdit = (props) => (
  <Edit title={<UserName />} {...props}>
    <SimpleForm>
      <DisabledInput source='id' />
      <TextInput source='username' />
      <TextInput source='email' />
      <TextInput source='password' type='password' />
      <SelectInput source='role' choices={getAllowedRoles()} />
    </SimpleForm>
  </Edit>
)

export const UserCreate = (props) => (
  <Create title='Create a User' {...props}>
    <SimpleForm redirect='list'>
      <TextInput source='username' />
      <TextInput source='email' />
      <TextInput source='password' type='password' />
      <SelectInput source='role' choices={getAllowedRoles()} />
    </SimpleForm>
  </Create>
)
