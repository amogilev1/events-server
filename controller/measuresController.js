'use strict'

const response = require('../response')
const db = require('../settings/db')

// GET -- get all measures
exports.measures = (req, res) => {
    db.query('SELECT * FROM `Measures`', (error, rows, fields) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })
}

// GET -- get measure by ID
exports.measure = (req, res) => {
    db.query('select * from `Measures` where `id` = "' + req.headers.id +'"', (error, rows, fields) => {
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

// POST -- add new measure
exports.add = (req, res) => {
    const sqlQuery = "INSERT INTO `Measures` (`measure_name`) VALUES ('"+ req.body.measureName +"')"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
        } else {
            response.status(200, results, res)
            console.log("New measure has been added")
        }
    })
}

// PUT -- update measure by id
exports.update = (req, res) => {
    const sqlQuery = "UPDATE `Measures` SET `measure_name` = '"+ req.body.newName +"' WHERE `id` = '"+ req.body.id +"'"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
            return
        }
        response.status(200, results, res)
    })
}

// POST -- remove measure by id
exports.remove = (req, res) => {
    const sqlQuery = "DELETE FROM `Measures` WHERE `id` = '"+ req.body.measureId + "'"
    db.query(sqlQuery, (error, results) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
            return
        }
        response.status(200, results, res)
    })
}
