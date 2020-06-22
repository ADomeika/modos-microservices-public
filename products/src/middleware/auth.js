const dictionary = require('../lang/dictionary')

module.exports = (req, res, next) => {
  const apiKey = req.header('Modos-Api-Key')
  if (!apiKey) {
    return res.status(401).json({ error: dictionary.error.forbidden[req.defaultLang] })
  }
  if (apiKey === process.env.APP_API_KEY) next()
  else res.status(401).json({ error: dictionary.error.forbidden[req.defaultLang] })
}
