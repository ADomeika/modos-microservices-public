const request = require('request-promise')

const user = process.env.PAYPAL_CLIENT
const pass = process.env.PAYPAL_SECRET

module.exports = {
  payment: (body) => {
    return request.post({
      uri: 'https://api.sandbox.paypal.com/v1/payments/payment',
      json: true,
      auth: {
        user,
        pass
      },
      body
    })
  },

  execute: ({ paymentID, body }) => {
    return request.post({
      uri: `https://api.sandbox.paypal.com/v1/payments/payment/${paymentID}/execute`,
      json: true,
      auth: {
        user,
        pass
      },
      body
    })
  }
}
