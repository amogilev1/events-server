const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'events'
})

connection.connect((error) => {
    if (error) {
        return console.log(error)
    } else {
        console.log('Connection succeed')
    }
})

module.exports = connection