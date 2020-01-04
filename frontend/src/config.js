export default {
  apiUrl: process.env.NODE_ENV === 'production' ? '/api' : '//' + window.location.hostname + ':3001/api'
}
