"use strict";
var Sequelize = require("sequelize");
var config = require("./config.json");

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var user = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    }
});

var image = sequelize.define('image', {
    url: {
        type: Sequelize.STRING,
        field: 'url' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    type: {
        type: Sequelize.STRING,
        field: 'type'
    }
});

user.hasMany(image);
image.hasOne(user, {foreignKey: "user_image_id", constraints: false});

//
//var Worker = sequelize.define("Worker", {
//    name: {
//        type: Sequelize.STRING,
//        field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
//    },
//    description: {
//        type: Sequelize.STRING,
//        field: 'description' // Will result in an attribute that is firstName when user facing but first_name in the database
//    }
//});
//
//var Project = sequelize.define("Project", {
//    name: {
//        type: Sequelize.STRING,
//        field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
//    },
//    description: {
//        type: Sequelize.STRING,
//        field: 'description' // Will result in an attribute that is firstName when user facing but first_name in the database
//    }
//});
//
//Project.belongsToMany(Worker, {through: 'WorkerProject'});
//Worker.belongsToMany(Project, {through: 'WorkerProject'});
//
//var teacher = sequelize.define("teacher", {
//    name: {
//        type: Sequelize.STRING,
//        field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
//    },
//    description: {
//        type: Sequelize.STRING,
//        field: 'description' // Will result in an attribute that is firstName when user facing but first_name in the database
//    }
//});
//
//var course = sequelize.define("course", {
//    name: {
//        type: Sequelize.STRING,
//        field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
//    },
//    description: {
//        type: Sequelize.STRING,
//        field: 'description' // Will result in an attribute that is firstName when user facing but first_name in the database
//    }
//});
//
//var student = sequelize.define("student", {
//    name: {
//        type: Sequelize.STRING,
//        field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
//    },
//    description: {
//        type: Sequelize.STRING,
//        field: 'description' // Will result in an attribute that is firstName when user facing but first_name in the database
//    }
//});
//
//teacher.belongsToMany(course, {through: "teachers_courses"});
//course.belongsToMany(teacher, {through: "teachers_courses"});
//student.belongsToMany(course, {through: "courses_students"});
//course.belongsToMany(student, {through: "courses_students"});
//
sequelize.sync({force: true}).then(function (status) {
    console.log("modelling process finished");
});

module.exports.UserModel = user;
module.exports.ImageModel = image;