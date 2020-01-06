import React from 'react'
import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput } from 'react-admin'

export const PropertyList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='id' />
      <TextField source='name' />
      <EditButton basePath='/Property' />
    </Datagrid>
  </List>
)

const Name = ({ record }) => {
  return <span>Property {record ? `"${record.name}"` : ''}</span>
}

export const PropertyEdit = (props) => (
  <Edit title={<Name />} {...props}>
    <SimpleForm>
      <TextInput source='id' disabled />
      <TextInput source='name' />
    </SimpleForm>
  </Edit>
)

export const PropertyCreate = (props) => (
  <Create title='Create a Property' {...props}>
    <SimpleForm redirect='list'>
      <TextInput source='name' />
    </SimpleForm>
  </Create>
)
