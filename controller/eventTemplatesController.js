'use strict'

const response = require('../response')
const db = require('../settings/db')

// GET -- get all event templates
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

// GET -- get template by ID
exports.eventTemplate = (req, res) => {
    db.query('select * from `EventTemplates` where `id` = "' + req.headers.id +'"', (error, rows, fields) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
            return
        }
        response.status(200, rows, res)
        console.log(req.headers.id)
        console.log(rows)
    })
}

// POST -- add new event template
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

// PUT -- update event template by id
exports.update = (req, res) => {
    const sqlQuery = "UPDATE `EventTemplates` SET `event_name` = '"+ req.body.newName +"' WHERE `id` = '"+ req.body.id +"'"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
            return
        }
        response.status(200, results, res)
    })
}

// POST -- remove event template by id
exports.remove = (req, res) => {
    const sqlQuery = "DELETE FROM `EventTemplates` WHERE `id` = '"+ req.body.eventId + "'"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
            return
        }
        response.status(200, results, res)
    })
}
