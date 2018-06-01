const Category = require('../model/db').Category
const route = require('express')
const sequelize = require('../model/db')

route.post('/insert', (req, req) => {   
    const categoryData = {
        id : req.body.categoryid,
        name : req.body.categoryname
    } 
    Category.create( categoryData,(res,result)=>{
    }).then((category)=>{
        console.log(category)
    })
})
