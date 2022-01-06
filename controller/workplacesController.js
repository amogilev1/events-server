'use strict'

const response = require('../response')
const db = require('../settings/db')

// GET -- get workspace state
exports.eventTemplates = (req, res) => {
    db.query('SELECT * FROM `EventTemplates`', (error, rows, fields) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })
}

// POST -- occupy workspace
exports.add = (req, res) => {
    const sqlQuery = "INSERT INTO `EventTemplates` (`event_name`) VALUES ('"+ req.body.eventName +"')"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
        } else {
            response.status(200, results, res)
            console.log("New template event has been added")
        }
    })
}
