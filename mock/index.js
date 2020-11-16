const user = require('./user');
const table = require('./table');
const err = require('./err')

const mocks = [
  ...user,
  ...table,
  ...err
];

module.exports = mocks;
