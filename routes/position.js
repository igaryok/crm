const router = require('express').Router();
const controller = require('../controllers/position');

router.route('/:id')
  .get(controller.getByCategoryId)
  .patch(controller.update)
  .delete(controller.remove);

router.route('/')
  .post(controller.create);

module.exports = router;