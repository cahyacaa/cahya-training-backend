const Role = require('../models').role;
const {response}=require('../helper/response')

module.exports = {
  list(req, res) {
    return Role
      .findAll({
        order: [
          ['roleCode', 'ASC'],
        ],
      })
      .then((roles) => response(res, 200, 'success', roles))
      .catch((error) => response(res, 500, error));
  },

  getById(req, res) {
    return Role
      .findByPk(req.params.id)
      .then((role) => {
        if (!Role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return res.status(200).send(role);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    const {
      roleName,
      roleCode,
      description
    } = req.body;
    const data = {
      roleName,
      roleCode,
      description
    }
    return Role
      .create(data)
      .then((role) => res.status(201).send(role))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    const {
      roleName,
      roleCode,
      description
    } = req.body;
    const data = {
      roleName,
      roleCode,
      description
    }
    return Role
      .findByPk(req.params.id)
      .then(Role => {
        if (!Role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return Role
          .update(data)
          .then((role) => response(res,200,'success',role))
          .catch((error) => response(res,500,'error',error));
      })
      .catch((error) => response(res,200,'success',error));
  },

  delete(req, res) {
    return Role
      .findByPk(req.params.id)
      .then(Role => {
        if (!Role) {
          return res.status(400).send({
            message: 'Role Not Found',
          });
        }
        return Role
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};