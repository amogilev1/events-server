'use strict'

const response = require('../response')
const db = require('../settings/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SALT_VALUE = 10

// GET -- get all users
exports.users = (req, res) => {
    db.query('select * from `Users`', (error, rows, fields) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
            return
        }
        response.status(200, rows, res)
    })
}

// GET -- get user by ID
exports.user = (req, res) => {
    db.query('select * from `Users` Where `id` = "' + req.body.id +'"', (error, rows, fields) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
            return
        }
        response.status(200, rows, res)
    })
}

// PUT -- change password
exports.changePassword = (req, res) => {
    currentPassword = req.body.currentPassword
    newPassword = req.body.newPassword
    newPasswordConfirmation = req.body.newPasswordConfirmation

    // Checking if two new passwords are the same
    if (newPassword !== newPasswordConfirmation) {
        response.status(400, {message: "Пароли не совпадают."}, res)
        return
    }

    const salt = bcrypt.genSaltSync(SALT_VALUE)
    const paswordHash = bcrypt.hashSync(initialPassword, salt)
    sqlQuery = "UPDATE `Users` SET `password` = '"+req.body.newPassword+"' WHERE `id` = '"+ req.body.userId +"'"
}

// POST -- add new user
exports.add = (req, res) => {
    // Trying to figure out if the user with the given email already exists
    const selectQuery = "select * from `Users` where `email` = '" + req.body.email + "'"
    db.query(selectQuery, (error, rows, fields) => {
        // Error getting user with given email
        if (error) {
            console.log(error)
            response.status(400, error, res)
            return
        }
        // User with a given email already exists
        if (rows.length > 0) {
            console.log("Trying to register user when the user with this email already exists")
            response.status(302, 'Already exists', res)
            return
        }
        // We made sure that there is no user with the given email, now it's time to register new user
        // Encrypting user password
        const initialPassword = req.body.password
        const salt = bcrypt.genSaltSync(SALT_VALUE)
        const paswordHash = bcrypt.hashSync(initialPassword, salt)

        const sqlQuery = "insert into `Users` (`name`, `email`, `password`) values ('" + req.body.name + "', '" + req.body.email + "', '" + paswordHash + "')"
        db.query(sqlQuery, (error, results) => {
            if (error) {
                console.log(error)
                response.status(400, error, res)
                return
            }
            response.status(200, results, res)
            console.log('New user has been added')
        })
    })
}

// GET -- Signin
exports.signin = (req, res) => {
    db.query("SELECT * FROM `Users` WHERE email = '" +  req.body.email + "'", (error, rows, fields) => {
        if (error) {
            console.log(error)
            response.status(400, error, res)
            return
        }
        if (rows.length <= 0) {
            response.status(401, `User with email ${req.body.email} not found.`, res)
            return
        }

        const row = JSON.parse(JSON.stringify(rows))
        row.map(rw => {
            const password = bcrypt.compareSync(req.body.password, rw.password)
            if (password)
            {
                // Todo - get key from config
                const token = jwt.sign({
                    userId: rw.id,
                    userEmail: rw.email
                }, 'jwt-key', {expiresIn: 120 * 120})
                response.status(200, {token: token, message: 'Signed in.'}, res)
            } else {
                response.status(400, {message: 'Wrong password.'}, res)
            }
            return true
        })
    })
}