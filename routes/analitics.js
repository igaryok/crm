const router = require('express').Router();
const controller = require('../controllers/analitics');

router.route('/overview')
  .get(controller.overview);

router.route('/analytics')
  .get(controller.analitics);

module.exports = router;