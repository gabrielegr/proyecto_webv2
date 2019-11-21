const User = require("../models/user.js")

/**
 * METHOD = POST
 * BODY:{
 *      carnet:String,
 *      schedule: String,
 *      isLate: Boolean,
 *      datetime: Date
 * }
 */
const insert = (req, res)=>{
    /**
     * Para ver el funcionamiento de req.body hacer:
     * console.log(req.body);
     */

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

/**
 * METHOD = PUT
 * BODY:{
 *      _id: mongoose.Schema.Types.ObjectId
 *      carnet:String,
 *      schedule: String,
 *      isLate: Boolean,
 *      datetime: Date
 * }
 */
const update = (req, res)=>{
    let user = req.body
    
    //console.log(register._id);
    

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