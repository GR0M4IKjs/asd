let mysql = require('mysql2');
const util = require('util');

 const connection = mysql.createConnection({
  host: "",
  port: порт,
  user: "",
  database: "",
  password: "",

});

const awaitdb = util.promisify(connection.query).bind(connection);


module.exports = { connection, awaitdb };