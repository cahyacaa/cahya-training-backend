const jwt = require('jsonwebtoken')
const {
  response
} = require('../helper/response')
const Promise = require('bluebird') 


module.exports = {
  authorization: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')
      if (token[0] == "Bearer") {
        jwt.verify(token[1], process.env.SECRET_KEY, (error, result) => {
          if (
            (error && error.name === 'JsonWebTokenError') ||
            (error && error.name === 'TokenExpiredError')
          ) {
            return response(res, 403, error.message)
          } else {
            jwt.decodetoken = result
            next()
          }
        })
      } else {
        return response(res, 403, 'Authorization Prefix is Wrong!')
      }
    } else {
      return response(res, 403, 'Please Login First !')
    }
  },
  authentication: (req, res, next) => {
    if (req.decodetoken.users_role === 0) {
      return response(
        res,
        400,
        'Not Allowed ! Page accessible by admin only'
      )
    } else {
      next()
    }
  }
}