const express = require('express')
const mysql = require('mysql')
const config = require('../../config')
var Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
var db = new Sequelize(config.local.database, config.local.username, config.local.password, {

    host: 'localhost',
    port: '3307',
    dialect: 'mysql',
    charset: 'utf8',
    collate: 'utf8_general_ci', 
    operatorsAliases: false,
    timestamps: false,
    // To create a pool of connections
    pool: {
        max: 5,
        min: 0,
        idle: 10000

    },
});

const Account = db.define('account', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(50),
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Category = db.define('category',{
    categoryid:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    categoryname:{
        type: Sequelize.STRING(80)
    }
    
})
const Product = db.define('product',{
    productid:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    productname:{
        type: Sequelize.STRING(80)
    },
    price :{
        type: Sequelize.FLOAT()
    },
    gender:{
        type: Sequelize.CHAR(2)
    }
})
Category.hasMany(Product)
Product.belongsTo(Category)

Account.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
/*db.sync()
    .then(() => console.log("Database to connect"))
    .catch((err) => console.error(err))*/
module.exports = {
    Account,Category
}