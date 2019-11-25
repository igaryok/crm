const router = require('express').Router();
const parseJson = require('express').json(); 

const controller = require('../controllers/auth');

router.route('/login')
  .post(parseJson, controller.login);

router.route('/register')
  .post(parseJson, controller.register);

module.exports = router;
