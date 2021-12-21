'use strict'

module.exports = (app) => {
    const indexController = require('../controllers/indexController')

    app.route('/').get(indexController.index);
}