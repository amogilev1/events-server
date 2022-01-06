'use strict'

module.exports = (app) => {
    const passport = require('passport')

    const indexController = require('../controller/indexController')
    const usersController = require('../controller/usersController')
    const eventsController = require('../controller/eventsController')
    const eventTemplatesController = require('../controller/eventTemplatesController')
    const measuresController = require('../controller/measuresController')

    app.route('/').get(indexController.index)

    // Users routes
    app.route('/api/users').get(passport.authenticate('jwt', {session: false}), usersController.users)
    app.route('/api/users').post(usersController.add)
    app.route('/api/auth/signin').post(usersController.signin)
    app.route('/api/user').get(passport.authenticate('jwt', {session: false}), usersController.user)

    // Events routes
    app.route('/api/events').get(eventsController.events)
    app.route('/api/events').post(passport.authenticate('jwt', {session: false}), eventsController.add)
    app.route('/api/events/remove').post(eventsController.remove)
    app.route('/api/events/confirm').post(eventsController.confirm)

    // Event templates routes
    app.route('/api/eventTemplates').get(eventTemplatesController.eventTemplates)
    app.route('/api/eventTemplate').get(eventTemplatesController.eventTemplate)
    app.route('/api/eventTemplates').post(eventTemplatesController.add)
    app.route('/api/eventTemplates/update').put(eventTemplatesController.update)
    app.route('/api/eventTemplates/remove').post(eventTemplatesController.remove)

    // Measures routes
    app.route('/api/measures').get(measuresController.measures)
    app.route('/api/measures').post(measuresController.add)
    app.route('/api/measure').get(measuresController.measure)
    app.route('/api/measures/update').put(measuresController.update)
    app.route('/api/measures/remove').post(measuresController.remove)
}