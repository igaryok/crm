const router = require('express').Router();
const controller = require('../controllers/order');

router.route('/')
  .get(controller.getALl)
  .post(controller.create);

module.exports = router;