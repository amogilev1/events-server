'use strict'

module.exports = (app) => {
    const indexController = require('../controller/indexController')
    const usersController = require('../controller/usersController')
    const eventsController = require('../controller/eventsController')

    app.route('/').get(indexController.index)

    // Users routes
    app.route('/users').get(usersController.users)
    app.route('/users').post(usersController.add)

    // Events routes
    app.route('/events').get(eventsController.events)
    app.route('/events').post(eventsController.add)
}