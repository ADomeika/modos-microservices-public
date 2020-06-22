const { check, validationResult } = require('express-validator')

const validationRules = () => {
  return [
    check('cartId').not().isEmpty(),
    check('details.firstName').not().isEmpty(),
    check('details.lastName').not().isEmpty(),
    check('details.email').not().isEmpty(),
    check('details.telephone').not().isEmpty(),
    check('details.deliveryType').not().isEmpty()
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}


module.exports = {
  validationRules,
  validate
}
