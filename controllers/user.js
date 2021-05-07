const Promise = require('bluebird');
const {
  response
} = require('../helper/response');
const User = Promise.promisifyAll((require('../models'))).user;
const bcrypt = require('bcrypt');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
require('dotenv').config()


module.exports = {
  list(req, res) {
    User
      .findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        order: [
          ['id', 'ASC'],
        ],
      })
      .then((users) => response(res, 200, 'success', users))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    User
      .findByPk(req.params.id, {})
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Users Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },

  login(req, res) {
    const {
      email,
      password
    } = req.body
    const data = {
      email,
      password
    }
    User
      .findOne({
        where: {
          email: email
        }
      }).then((user) => {
        if (user) {
          const validatePassword = bcrypt.compareSync(
            password,
            user.password)
          if (validatePassword) {
            const {
              id,
              name,
              email,
              phonenumber,
            } = user
            const payload = {
              id,
              name,
              email,
              phonenumber,
            }
            console.log(process.env.SECRET_KEY)
            const token = jwt.sign(payload, process.env.SECRET_KEY , {
              expiresIn: '3h'
            })
            const result = {
              ...payload,
              token
            }
            return response(res, 200, 'You are Loging in !', result)
          } else {
            return response(res, 401, 'Password Wrong')
          }
        } else {
          response(res, 404, 'email not found!')
        }
      }).catch((error) => {
        response(res, 500, 'error', error)
      })


  },

  async add(req, res) {
    const {
      name,
      email,
      gender,
      phonenumber,
      password
    } = req.body
    const salt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(password, salt)
    const data = {
      name,
      email,
      gender,
      phonenumber,
      password: encryptPassword
    }
    checkExisting = await User
      .findOne({
        where: {
          email: email
        }
      })
      .then((user) => {
        if (user) {
          return user
        } else {
          return null
        }
      })
      .catch((error) => {
        return error
      })
    if (!checkExisting && typeof email != 'undefined') {
      console.log(data)
      await User
        .create(data)
        .then((users) => {
          return response(res, 200, 'success', users)
        })
        .catch((error) => {
          return response(res, 500, 'error', error)
        });
    } else {
      return response(res, 400, 'Email Is Exists')
    }
  },

  update(req, res) {
    const {
      name,
      email,
      gender,
      phonenumber
    } = req.body
    const data = {
      name,
      email,
      gender,
      phonenumber
    }
    User
      .findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update(
            data
          )
          .then((users) => response(res, 200, 'success', users))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    User
      .findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  getUserProfile(req, res) {
    let token = req.headers.authorization;
    token = token.split(' ');
    token = token[1];
    const data = jwt.decode(token);
    User
      .findOne({
        where: {
          id: data.id
        },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        }
      })
      .then(user => {
        if (user) {
          return response(res, 200, 'success', user)
        }
      })
      .catch((error) => res.status(400).send(error));
  }
};