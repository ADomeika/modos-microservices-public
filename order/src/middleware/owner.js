module.exports = (req, res, next) => {
  if (req.params.id === req.cookies['session-id']) {
    next()
  } else res.status(403).json({ error: 'Neleistina' })
}
