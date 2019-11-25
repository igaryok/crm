const crypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    const checkPassword = await crypt.compare(req.body.password, candidate.password);

    if (checkPassword) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 3600});

      res.status(200).json({
        token: `Bearer ${token}`
      });
    } else {
      res.status(401).json({
        message: 'Wrong password'
      });
    }

  } else {
    res.status(404).json({
      message: 'User have not found'
    });
  }
}

module.exports.register = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    res.status(409).json({
      message: 'Such email is existed'
    });
  } else {
    const salt = await crypt.genSalt(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: await crypt.hash(password, salt)
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      errorHandler(res, err);
    }
  }
}
