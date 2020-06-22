const dictionary = require('../lang/dictionary')

const preferredLanguage = 'lt'

module.exports = (req, res, next) => {
  if (req.params.id === req.cookies['session-id']) {
    next()
  } else res.status(403).json({ error: dictionary.error.forbidden[preferredLanguage] })
}
