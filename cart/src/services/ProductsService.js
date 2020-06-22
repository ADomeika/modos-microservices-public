const request = require('request-promise')

module.exports = {
  update: ({ productId, body }) => {
    return request.patch(`http://products:3000/api/products/${productId}`, {
      json: true,
      body,
      headers: {
        'Modos-Api-Key': process.env.APP_API_KEY
      }
    })
  },

  show: (id) => {
    return request.get(`http://products:3000/api/products/${id}`, {
      json: true
    })
  }
}
