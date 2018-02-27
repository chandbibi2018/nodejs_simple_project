var pg=require("pg");

var pool;
var config = {
  user: 'postgres',
  database: 'mydata',
  password: 'root',
  port: 5432,
  max: 10,
  host: 'localhost',
  idleTimeoutMillis: 30000,
};

module.exports = {
    getPool: function () {
      if (pool) return pool; // if it is already there, grab it here
      pool = new pg.Pool(config);
      return pool;
  }
}