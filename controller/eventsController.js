'use strict'

const response = require('../response')
const db = require('../settings/db')

// GET -- get all events
exports.events = (req, res) => {
    db.query('select * from `Events`', (error, rows, fields) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })
}

// POST -- add new event
exports.add = (req, res) => {
    const date = new Date()
    const newDate = date.toISOString().slice(0, 19).replace('T', ' ')

    const sqlQuery = "insert into `events` (`event_name`, `additional_info`, `timestamp`) values ('"+ req.body.eventName +"' , '"+ req.body.additionalInfo +"', '" + newDate + "')"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
        } else {
            response.status(200, results, res)
            console.log("New event has been added")
        }
    })
}

// Post -- remove event by id
exports.remove = (req, res) => {
    const sqlQuery = "DELETE FROM `Events` WHERE `id` = '"+ req.body.eventId + "'"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
            return
        }
        response.status(200, results, res)
    })
}