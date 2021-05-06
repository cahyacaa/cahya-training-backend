const Promise= require('bluebird');
const {response} = require('../helper/response');
const User = Promise.promisifyAll(require('../models')).user;

module.exports = {
  list(req, res) {
    User
      .findAll({
        order: [
          ['id', 'ASC'],
        ],
      })
      .then((users) => response(res,200,'success',users) )
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
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    const userModel = {
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      gender: req.body.gender || user.gender,
      phonenumber: req.body.phonenumber || user.phonenumber
    }
    User
      .create(userModel)
      .then((users) => response(res,200,'success',users) )
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    console.log(req.body)
    const userModel = {
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      gender: req.body.gender || user.gender,
      phonenumber: req.body.phonenumber || user.phonenumber
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
            userModel
          )
          .then((users) => response(res,200,'success',users) )
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
};