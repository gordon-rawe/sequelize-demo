"use strict";
var Sequelize = require("sequelize");
var config = require("./config.json");

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var User = sequelize.define('User', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

var Worker = sequelize.define("Worker", {
    name: {
        type: Sequelize.STRING,
        field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    description: {
        type: Sequelize.STRING,
        field: 'description' // Will result in an attribute that is firstName when user facing but first_name in the database
    }
});

var Project = sequelize.define("Project", {
    name: {
        type: Sequelize.STRING,
        field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    description: {
        type: Sequelize.STRING,
        field: 'description' // Will result in an attribute that is firstName when user facing but first_name in the database
    }
});

Project.belongsToMany(Worker, {through: 'WorkerProject'});
Worker.belongsToMany(Project, {through: 'WorkerProject'});

sequelize.sync({force: true}).then(function (status) {
    console.log("modelling process finished");
});

module.exports.UserModel = User;
module.exports.ProjectModel = Project;
module.exports.WorkerModel = Worker;