const request = require('request-promise')

module.exports = {
  destroy: ({ productId, body }) => {
    return request.delete({
      uri: `http://localhost:5001/api/products/${productId}`,
      json: true,
      body,
      headers: {
        'Modos-Api-Key': process.env.APP_API_KEY
      }
    })
  },

  show: (id) => {
    return request.get({
      uri: `http://localhost:5001/api/products/${id}`,
      json: true
    })
  }
}
