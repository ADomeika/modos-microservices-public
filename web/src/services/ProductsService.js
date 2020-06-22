const request = require('request-promise')

module.exports = {
  index: async () => {
    return request.get('http://products:3001/api/products')
  }
}
