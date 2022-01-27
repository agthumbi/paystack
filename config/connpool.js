const mysql = require('mysql2')
const db = require('./connect')
var connect = {}





connect.pool = mysql.createPool(db)

//get connection
connect.poolConnect = connect.pool.getConnection(err => {
    connect.handleConPool(err)

})
//Reconnect the pool incase of timeout or error
connect.recon = () => {
    connect.poolConnect = connect.pool.getConnection(err => {
        connect.handleConPool(err)

    })
};
//Managing the connection pool
connect.handleConPool = (err = null) => {
    var validate = {}
    validate['code'] = 1

    if (err) {
        console.log('Lets see error' + err)
        if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
            console.error('Db Query fatal error');
            validate['message'] = 'Db Query fatal error.Please try again'
        }


        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
            validate['message'] = 'Database connection was closed.Please try again'
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
            validate['message'] = 'Database has too many connections.Please try again'
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
            validate['message'] = 'Database connection was refused.Please try again'
        }
        if (err.code = "ETIMEDOUT") {
            console.error('Connection to DB timeout')
            validate['message'] = 'Connection to DB timeout.Please try again'
        }
        if (err.code = "ECONNRESET") {
            console.error('Connection to DB was reset')
            validate['message'] = 'Connection to DB was reset.Please try again'
        }


    }

    return validate

}

module.exports = connect
