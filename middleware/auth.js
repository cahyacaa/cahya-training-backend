const jwt = require('jsonwebtoken')

module.exports = {
  authorization: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          req.decodetoken = result
          next()
        }
      })
    } else {
      return helper.response(res, 403, 'Please Login First !')
    }
  },
  authentication: (req, res, next) => {
    if (req.decodetoken.users_role === 0) {
      return helper.response(
        res,
        400,
        'Not Allowed ! Page accessible by admin only'
      )
    } else {
      next()
    }
  }
}