'use strict'

const response = require('../response')
const db = require('../settings/db')

// GET -- get all events
exports.events = (req, res) => {
    db.query('select * from `Events`', (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.status(rows, res)
        }
    })
}

// POST -- add new event
exports.add = (req, res) => {
    const sqlQuery = "insert into `events` (`event_name`, `additional_info`) values ('"+ req.query.eventName +"' , '"+ req.query.additionalInfo +"')"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
        } else {
            response.status(results, res)
            console.log("New event has been added")
        }
    })
}