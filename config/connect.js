 require('dotenv').config()
const db = {}
db.host = process.env.DB_HOST
db.user = process.env.DB_USER
db.password = process.env.DB_PASSWORD
db.database = process.env.DB_DATABASE
db.port = process.env.DB_PORT
db.connectionLimit = process.env.DB_CONNECTION_LIMIT

module.exports = db