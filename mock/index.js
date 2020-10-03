const user = require('./user');
const table = require('./table');

const mocks = [
  ...user,
  ...table
];

module.exports = mocks;
