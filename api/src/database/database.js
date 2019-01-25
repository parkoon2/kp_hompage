import mysql from 'mysql'

const HOST = '106.240.247.42'
const DB = 'kp_homepage'
const USER = 'kpoint'
const PASSWORD = 'kpoint01'
const LIMIT = 10



// export const connect = () => {
//     return new Promise((resolve, reject) => {
//         const connection = mysql.createConnection({
//             host: HOST,
//             user: USER,
//             password: PASSWORD,
//             database: DB,
//         })

//         connection.connect((err) => {
//             if (err) {
//                 reject(err)
//             }

//             resolve(connection)
//         })
//     })

// }
let instance
export default class Database {
    constructor(config) {
        if (instance) {
            return instance
        }

        instance = this
        this.config = config
        this.pool = null
        this.connect()
    }

    connect() {
        this.pool = mysql.createPool(this.config)
    }

    query(query, params) {
        return new Promise((resolve, reject) => {

            this.pool.getConnection((err, connection) => {
                if (err) {
                    connection.release()
                    reject(err)
                }

                connection.query(query, params, (err, rows) => {
                    connection.release()
                    if (err) {
                        reject(err)
                    }
                    console.log('###')
                    console.log(query)
                    resolve(rows)
                })

            })
        })

    }
}




// var mysql   = require("mysql");

// var pool = mysql.createPool({
//     connectionLimit : 10,
//     host: Config.appSettings().database.host,
//     user: Config.appSettings().database.username,
//     password: Config.appSettings().database.password,
//     database: Config.appSettings().database.database
// });


// var DB = (function () {

//     function _query(query, params, callback) {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 connection.release();
//                 callback(null, err);
//                 throw err;
//             }

//             connection.query(query, params, function (err, rows) {
//                 connection.release();
//                 if (!err) {
//                     callback(rows);
//                 }
//                 else {
//                     callback(null, err);
//                 }

//             });

//             connection.on('error', function (err) {
//                 connection.release();
//                 callback(null, err);
//                 throw err;
//             });
//         });
//     };

//     return {
//         query: _query
//     };
// })();

// module.exports = DB;
// Just use it like that:

// var DB = require('../dal/base.js');

// DB.query("select * from tasks", null, function (data, error) {
//    callback(data, error);
// });