'use strict'

const response = require('../response')
const db = require('../settings/db')
const jwt = require('jsonwebtoken')

// GET -- get all events
exports.events = (req, res) => {
    db.query('SELECT * FROM `Events` ORDER BY `timestamp` DESC', (error, rows, fields) => {
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
    let token = req.headers.authorization
    token = token.replace("Bearer ", "")
    const tokenPayload = jwt.verify(token, 'jwt-key')

    const date = new Date()
    const newDate = date.toISOString().slice(0, 19).replace('T', ' ')

    if (req.body.id) {
        // Trying to find event template by id in the request body
        db.query("SELECT * FROM `EventTemplates` WHERE `id` = '" + req.body.id + "'", (error, rows, fields) => {
            if (error) {
                console.log(error)
                response.status(400, error, res)
                return
            }
            if (rows.length <= 0) {
                response.status(400, { message: "Указан неверный шаблон события." }, res)
            }
        })
    }


    const sqlQuery = "INSERT INTO `Events` (`event_template_id`, `additional_info`, `timestamp`, `workplace_id`, `user_id`, `measure_id`) VALUES ('" + req.body.eventTemplateId + "' , '" + req.body.additionalInfo + "', '" + newDate + "', '" + req.body.workplaceId + "', '"+ tokenPayload.userId +"', '"+ req.body.measureId +"')"
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

// POST -- remove event by id
exports.remove = (req, res) => {
    const sqlQuery = "DELETE FROM `Events` WHERE `id` = '" + req.body.eventId + "'"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
            return
        }
        response.status(200, results, res)
    })
}

// PUT -- confirm event
exports.confirm = (req, res) => {
    const sqlQuery = "UPDATE `Events` SET `confirmed` = 1 WHERE `id` = '" + req.body.id + "'"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
            return
        }
        response.status(200, results, res)
    })
} 