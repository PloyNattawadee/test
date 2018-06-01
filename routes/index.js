const route = require('express').Router()

route.use('/account', require('../api/controller/register'))
route.use('/category', require('../api/controller/category'))

module.exports = {
    route
}
