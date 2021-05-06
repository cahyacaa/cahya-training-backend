var express = require('express');
var router = express.Router();
const userController = require('../controllers').user;

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
  router.get('/user', userController.list);
  router.get('/user/:id', userController.getById);
  router.post('/user',  userController.add);
  router.put('/user/:id', userController.update);
  router.delete('/user/:id', userController.delete);
})

module.exports = router;
