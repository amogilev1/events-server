'use strict'

const response = require('../response')
const db = require('../settings/db')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const maxElementsOnPage = 30

const getSqlStringByDateFilter = (dateFilter) => {
    if (dateFilter === 'today') {
        return 'AND DATE(`timestamp`) = CURDATE()'
    }
    if (dateFilter === 'week') {
        return 'AND YEARWEEK(`timestamp`, 1) = YEARWEEK(CURDATE(), 1)'
    }
    if (dateFilter === 'month') {
        return 'AND MONTH(`timestamp`) = MONTH(CURDATE())'
    }
    return ''
}

// GET -- get all events
exports.events = (req, res) => {
    const workplaceFilter = req.headers.workplace != 'all' ? ' WHERE `workplace_id` = "' + req.headers.workplace +'"' : "WHERE `workplace_id` LIKE '%'" 
    const eventTemplateFilter = req.headers.template != "null" ? 'AND `event_template_id` = "' +req.headers.template+ '"' : ''
    const dateFilter = getSqlStringByDateFilter(req.headers.test)

    const page = req.headers.page
    const offset = maxElementsOnPage * (page - 1)

    db.query("SELECT * FROM `Events` " + workplaceFilter + " " + dateFilter + "" + eventTemplateFilter +" ORDER BY `timestamp` DESC LIMIT " + offset + ", " + maxElementsOnPage + "", (error, rows, fields) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })
}

// GET -- get event by id
exports.event = (req, res) => {
    const sqlQuery = "SELECT * FROM `Events` WHERE `id` = '" + req.headers.id + "'"
    db.query(sqlQuery, (error, rows, fields) => {
        if (error) {
            response.status(400, error, res)
            return
        }
        response.status(200, rows, res)
    })
}

// GET -- get pages count
exports.count = (req, res) => {
    const workplaceFilter = req.headers.workplace != 'all' ? 'WHERE `workplace_id` = "' + req.headers.workplace +'"' : "WHERE `workplace_id` LIKE '%'" 
    const eventTemplateFilter = req.headers.template != "null" ? 'AND `event_template_id` = "' +req.headers.template+ '"' : ''
    const dateFilter = getSqlStringByDateFilter(req.headers.test)

    db.query("SELECT `id` FROM `Events` " + workplaceFilter + " " + dateFilter + "" + eventTemplateFilter +" ORDER BY `timestamp` DESC", (error, rows, fields) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
        } else {
            const pages = Math.ceil(rows.length / maxElementsOnPage)
            response.status(200, pages, res)
        }
    })
}

// POST -- add new event
exports.add = (req, res) => {
    let token = req.headers.authorization
    token = token.replace("Bearer ", "")
    const tokenPayload = jwt.verify(token, 'jwt-key')

    const newDate = moment().format().slice(0, 19).replace('T', ' ')

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


    const sqlQuery = "INSERT INTO `Events` (`event_template_id`, `additional_info`, `timestamp`, `workplace_id`, `user_id`, `measure_id`, `close_info`) VALUES ('" + req.body.eventTemplateId + "' , '" + req.body.additionalInfo + "', '" + newDate + "', '" + req.body.workplaceId + "', '"+ tokenPayload.userId +"', '"+ req.body.measureId +"', '"+ req.body.closeInfo +"')"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
        } else {
            response.status(200, results, res)
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

// PUT -- update event
exports.update = (req, res) => {
    const sqlQuery = "UPDATE `Events` SET `event_template_id` = '" + req.body.eventTemplateId + "', `measure_id` = '" + req.body.measureId + "', `additional_info` = '" + req.body.additionalInfo + "', `workplace_id` = '" + req.body.workplaceId + "', `close_info` = '" + req.body.closeInfo + "' WHERE `id` = '" + req.body.id + "'"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            response.status(400, error, res)
            console.log(error)
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