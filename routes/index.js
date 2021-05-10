var express = require('express');
var router = express.Router();
const {
  user,
  role
} = require('../controllers');

const {
  authorization,
  authentication
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
  router.get('/user/profile',authorization, user.getUserProfile);
  router.get('/user', authorization, authentication, user.list);
  router.get('/user/:id', authorization, authentication, user.getById);
  router.post('/user/register', user.add);
  router.put('/user/profile', authorization, user.updateProfile);
  router.put('/user/:id', authorization, authentication, user.update);
  router.delete('/user/:id', authorization, authentication, user.delete);

  // session api
  router.post('/user/login', user.login);
  router.post('/user/logout', user.logout);

  // role api
  router.post('/role', authentication, role.add);
  router.get('/role', authentication, role.list);
  router.get('/role/:id', authentication, role.getById);
  router.put('/role/:id', authentication, role.update);
  router.delete('/role/:id', authentication, role.delete);
})

module.exports = router;