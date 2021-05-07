var express = require('express');
var router = express.Router();
const {
  user,
  role
} = require('../controllers');

const {
  authorization
} = require('../middleware/auth')


/* GET home page. */
router.get('/', function (req, res, next) {
  return res.status(200).send({
    message: 'PONG'
  })
});
express.application.prefix = express.Router.prefix = function (path, configure) {
  var router = express.Router();
  this.use(path, router);
  configure(router);
  return router;
};



router.prefix('/v1', function (router) {
  // user api
  router.get('/user/profile', authorization, user.getUserProfile);
  router.get('/user', authorization, user.list);
  router.get('/user/:id', authorization, user.getById);
  router.post('/user', user.add);
  router.put('/user/:id', authorization, user.update);
  router.delete('/user/:id', authorization, user.delete);

  // session api
  router.post('/user/login', user.login);
  router.post('/user/logout', user.logout);

  // role api
  router.post('/role', role.add);
  router.get('/role', role.list);
  router.get('/role/:id', role.getById);
  router.put('/role/:id', role.update);
  router.delete('/role/:id', role.delete);
})

module.exports = router;