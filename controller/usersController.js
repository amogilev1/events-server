'use strict'

const response = require('../response')
const db = require('../settings/db')

// GET -- get all users
exports.users = (req, res) => {
    db.query('select * from `Users`', (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.status(rows, res)
        }
    })
}

// POST -- add new user
exports.add = (req, res) => {
    const sqlQuery = "insert into `users` (`name`) values ('"+ req.query.name +"')"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
        } else {
            response.status(results, res)
            console.log('New user has been added')
        }
    })
}