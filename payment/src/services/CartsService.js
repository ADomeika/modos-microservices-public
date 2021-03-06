const request = require('request-promise')

module.exports = {
  destroy: ({ cartId, body }) => {
    return request.delete({
      uri: `http://cart:3000/api/carts/${cartId}`,
      json: true,
      body,
      headers: {
        'Modos-Api-Key': process.env.APP_API_KEY
      }
    })
  },
  show: (id) => {
    return request.get({
      uri: `http://cart:3000/api/carts/${id}`,
      json: true,
      headers: {
        cookie: `session-id=${id}`
      }
    })
  }
}
