'use strict'

module.exports = (app) => {
    const passport = require('passport')

    const indexController = require('../controller/indexController')
    const usersController = require('../controller/usersController')
    const eventsController = require('../controller/eventsController')

    app.route('/').get(indexController.index)

    // Users routes
    app.route('/api/users').get(passport.authenticate('jwt', {session: false}), usersController.users)
    app.route('/api/users').post(usersController.add)
    app.route('/api/auth/signin').get(usersController.signin)

    // Events routes
    app.route('/api/events').get(eventsController.events)
    app.route('/api/events').post(eventsController.add)
    app.route('/api/events/remove').post(eventsController.remove)
}