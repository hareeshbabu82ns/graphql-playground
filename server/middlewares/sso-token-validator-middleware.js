const createError = require('http-errors');
const axios = require('axios');
const axiosCRM = require('../db/axiosCRM');
const { fetchUserData } = require('../utils');
const _ = require('lodash');


module.exports = (req, res, next) => {
  if (req && req.headers && req.headers.mysapsso2) {
    fetchUserData(req).then((data) => {
      req.sapUserData = data.userData;
      axiosCRM.defaults.headers['MYSAPSSO2'] = data.ssoToken;
      next();
    }).catch(err => next(err));
  } else {
    next(createError(401, 'SAP SSO validation failed.'));
  }
};
