const jwt = require('jsonwebtoken')
const {
  response
} = require('../helper/response')
const User = require('../models').user
const {
  decodeToken
} = require('../module/jwtDecode')

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
    const data = decodeToken(req)
    User
      .findOne({
        where: {
          id: data.id
        },
        attributes: ['id', "roleID", 'activeStatus']
      })
      .then((role) => {
        if (role.roleID != 'admin' || !role.activeStatus) {
          return response(
            res,
            '403',
            'Not Allowed ! Page accessible by admin and active user only'
          )
        } else {
          next()
        }
      })
      .catch((error) => {
        response(res, 500, error)
      })
  }
}