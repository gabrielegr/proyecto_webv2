var express = require('express');
var User = require('../models/user');
var mongoose=require("mongoose")
var debug = require('debug')('proyectowebv2:user_controller');
const bcrypt = require('bcrypt');
var router=express.Router()

// Search a one user y database

module.exports.getOne = (req, res, next) => {
    debug("Search User", req.params);
    User.findOne({
        email: req.params.email
    }, "-password")
        .then((foundUser) => {
            debug("Found User", foundUser);
            if (foundUser)
                return res.status(200).json(foundUser);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Usert List", {
        size: perPage,
        page,
        sortby: sortProperty,
        sort
    });

    User.find({}, "-password")
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            [sortProperty]: sort
        })
        .then((users) => {
            return res.status(200).json(users)
        }).catch(err => {
            next(err);
        });
}

// New User

module.exports.register = (req, res, next) => {
    debug("New User", {
        body: req.body
    });
    User.findOne({
        email: req.body.email
    }, "-password")
        .then((foundUser) => {
            if (foundUser) {
                debug("Usuario duplicado");
                throw new Error(`Usuario duplicado ${req.body.nombre}`);
            } else {
                let newUser = new User({
                    email: req.body.email,
                    nombre: req.body.nombre,
                    password: bcrypt.hashSync(req.body.contraseña, 10),
                    tipo: req.body.tipo
                });
                return newUser.save();
            }
        }).then(user => {
            return res
                .header('Location', '/users/' + user._id)
                .status(201)
                .json({
                    nombre: user.nombre
                });
        }).catch(err => {
            next(err);
        });
}

// Update user 

module.exports.update = (req, res, next) => {
    debug("Update user", {
        email: req.params.email,
        ...req.body
    });

    let update = {
        ...req.body
    };

    User.findOneAndUpdate({
        email: req.params.email
    }, update, {
        new: true
    })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

module.exports.delete = (req, res, next) => {

    debug("Delete user", {
        nombre: req.params.nombre,
    });

    User.findOneAndDelete({ email: req.params.email })
        .then((data) => {
            if (data) res.status(200).json(data);
            else res.status(404).send();
        }).catch(err => {
            next(err);
        })
}