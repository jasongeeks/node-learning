const { Pool } = require('pg');
const config = require('../config/config');

let pool;

const init = () => {
  const pgConfig = config.postgres;
  pgConfig.user = 'me';
  pgConfig.password = 'password'; // Passwords need to be kept in a safe place and then retrieved
  pool = new Pool(pgConfig);
};

module.exports.getPool = () => pool;
module.exports.init = init;
