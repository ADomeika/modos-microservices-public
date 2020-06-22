const sgMail = require('@sendgrid/mail')
const { validationResult } = require('express-validator')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.store = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { email, fullName, message } = req.body
  const msg = {
    to: 'modos.design.info@gmail.com',
    from: email,
    subject: 'Klausimas iš ' + fullName,
    text: message,
    html: '<strong>' + message + '</strong>'
  }
  try {
    await sgMail.send(msg)
    res.send()
  } catch (error) {
    res.status(500).json({ error: 'Serverio klaida' })
  }
}
