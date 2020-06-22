const { check, validationResult } = require('express-validator')

const validationRules = () => {
  return [
    check('name').not().isEmpty(),
    check('price').isNumeric(),
    check('sizes').isArray(),
    check('category').not().isEmpty(),
    check('subCategory').not().isEmpty(),
    check('description').not().isEmpty(),
    check('additionalInfo').not().isEmpty()
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
