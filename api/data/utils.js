'use strict'

const httpError = (statusCode, message) => {
  return new Error('HTTPSTATUS: ' + statusCode + '; ' + message)
}

const checkPermission = (user, rolesAllowed) => {
  if (!user) {
    throw httpError(401, 'You are not authenticated!')
  }

  if (rolesAllowed.indexOf(user.role) === -1) {
    throw httpError(403, 'Permission denied!')
  }
}

const getListingQuery = (page, perPage, sortField, sortOrder, filter) => {
  const query = {}

  if (typeof page !== 'undefined' && typeof perPage !== 'undefined') {
    query.offset = page * perPage
    query.limit = perPage
  }

  if (sortField && sortOrder) {
    query.order = [ [ sortField, sortOrder ] ]
  }

  if (filter && filter.ids) {
    query.where = { id: filter.ids }
  }

  return query
}

const getListingCountQuery = (page, perPage, sortField, sortOrder, filter) => {
  const query = {}

  if (filter.ids) {
    query.where = { id: filter.ids }
  }

  return query
}

module.exports = {
  checkPermission: checkPermission,
  getListingQuery: getListingQuery,
  getListingCountQuery: getListingCountQuery
}
