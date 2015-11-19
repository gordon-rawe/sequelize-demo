"use strict";
var express = require("express");
var app = express();
var UserModel = require("./user").UserModel;

app.get("/", function (req, res) {
    UserModel.findOne().then(function (user) {
        res.json(JSON.stringify(user));
    });
});

app.get("/create", function (req, res) {
    UserModel.create({firstName: "Gordon", lastName: "Rawe"}).then(function (user) {//a user will be responded
        UserModel.findAll().then(function (users) {
            res.json(users);
        });
    })
});

app.get("/update", function (req, res) {
    UserModel.update({firstName: "nicole"}, {where: {id: [1, 2]}}).then(function (count) {
        res.send({status: true, count: count});
    });
});

app.get("/destroy", function (req, res) {
    UserModel.destroy({where: {firstName: "Gordon"}}).then(function (count) {
        res.send({status: true, count: count});
    });
});

app.listen(1128);