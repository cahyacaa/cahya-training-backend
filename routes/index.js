var express = require('express');
var router = express.Router();
const userController = require('../controllers').user;
const {authorization}= require('../middleware/auth')
/* GET home page. */
router.get('/', function(req, res, next) {
    return res.status(200).send({
      message:'PONG'
    })
});
express.application.prefix = express.Router.prefix = function (path, configure) {
  var router = express.Router();
  this.use(path, router);
  configure(router);
  return router;
};



router.prefix('/v1', function(router) {
  // user api
  router.get('/user/profile', authorization,userController.getUserProfile);
  router.get('/user', authorization,userController.list);
  router.get('/user/:id',authorization, userController.getById);
  router.post('/user',  userController.add);
  router.put('/user/:id',authorization, userController.update);
  router.delete('/user/:id',authorization, userController.delete);

   // session api
   router.post('/user/login', userController.login);
   router.post('/user/logout', userController.getById);
})

module.exports = router;
