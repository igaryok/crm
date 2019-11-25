const router = require('express').Router();
const passport = require('passport'); 

const controller = require('../controllers/category');

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.getALl)
  .post(controller.create);

router.route('/:id')
  .get(controller.getById)
  .patch(controller.update)
  .delete(controller.remove);

module.exports = router;