const User = require("../models/user.js")

const insert = (req, res)=>{
    if(!req.body.nombre || !req.body.contraseña){
        return res.status(400).json({
            message: "There are missing fields",
        });
    }
    
    let user = new User(
        req.body
    );

    user.save((err, nUser)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to insert user",
        });

        res.status(200).json({
            message: "Insert user was successful",
            user: nUser
        });
    })
}
const update = (req, res)=>{
    let user = req.body

    if(!user._id){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    User.update({_id: user._id}, user)
        .then(value =>{
            res.status(200).json({
                message: "update user was successful"
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Something happend trying to update the user"
            });
        })

}

const deleteById = (req, res)=>{
    let user = req.body;

    if(!user._id){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    User.deleteOne({_id:user._id})
        .then(deleted=>{
            res.status(200).json({
                message: "delete user was successful"
            });
        })
        .catch(err=>{
            res.status(500).json({
                message: "Something happend trying to delete the user"
            });
        })
}

/**
 * METHOD = GET
 */
const getAll = (req, res)=>{
        User.find((err, users)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to get the user",
        });

        if(users){
            res.status(200).json(users);
        }else{
            res.status(404).json({
                message: "There aren't any users",
            });
        }
    });
}

/**
 * METHOD = GET
 * Params -> id
 */
const getOneById = (req, res)=>{
    let id = req.params.id; 

    User.findById(id, (err, user)=>{
        if(err) return res.status(500).json({
            message: "Something went wrong trying to get all users",
        });

        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({
                message: `There isn't any user with id ${id}`,
            });
        }
    });  
}

const panic = (req, res)=>{
    User.deleteMany({}, (err)=>{
        res.status(200).send("Quizas un cuento te animara. Se llama el codigo feo. Habia una vez un codigo tan feo que todos se murieron. FIN");
    });
}

module.exports = {
    insert,
    update,
    deleteById,
    getAll,
    getOneById,
    panic,
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var User = require('../models/user');
var debug = require('debug')('blog:user_controller');

// Search a one user y database
module.exports.getOne = (req, res, next) => {
    debug("Search User", req.params);
    User.findOne({
            username: req.params.username
        }, "-password -login_count")
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

    User.find({}, "-password -login_count")
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            [sortProperty]: sort
        })
        .then((users) => {
            debug("Found users", users);
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
            username: req.body.username
        }, "-password -login_count")
        .then((foundUser) => {
            if (foundUser) {
                debug("Usuario duplicado");
                throw new Error(`Usuario duplicado ${req.body.username}`);
            } else {
                let newUser = new User({
                    username: req.body.username,
                    first_name: req.body.firts_name || "",
                    last_name: req.body.last_name || "",
                    email: req.body.email,
                    password: req.body.password /*TODO: Modificar, hacer hash del password*/
                });
                return newUser.save();
            }
        }).then(user => {
            return res
                .header('Location', '/users/' + user.username)
                .status(201)
                .json({
                    username: user.username
                });
        }).catch(err => {
            next(err);
        });
}


// Update user 

module.exports.update = (req, res, next) => {
    debug("Update user", {
        username: req.params.username,
        ...req.body
    });

    let update = {
        ...req.body
    };

    User.findOneAndUpdate({
            username: req.params.username
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
        username: req.params.username,
    });

    User.findOneAndDelete({username: req.params.username})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}