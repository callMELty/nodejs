const oracledb = require('oracledb');
// var config = {
//     user:'sde',
//     password:'sde',
//     connectString : "10.136.6.35:1521/orcl"
// };
let connection  =  oracledb.getConnection({
    user:'sde',
    password:'sde',
    connectString : "10.136.6.35:1521/orcl"});
module.exports = connection;
