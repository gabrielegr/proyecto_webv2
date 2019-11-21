const Supervise = require("../models/supervise.js")

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

    if(!req.body.usario || !req.body.hinicio || !req.body.hfin || !req.body.laboratorio || !req.body.fecha){
        return res.status(400).json({
            message: "There are missing fields",
        });
    }
    
    let supervise = new Supervise(
        req.body
    );

    supervise.save((err, nSupervise)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to insert laboratory supervision",
        });

        res.status(200).json({
            message: "Insert laboratory supervision was successful",
            supervise: nSupervise
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
    let supervise = req.body
    
    //console.log(register._id);
    

    if(!supervise._id){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    Supervise.update({_id: supervise._id}, supervise)
        .then(value =>{
            res.status(200).json({
                message: "update laboratory supervision was successful"
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Something happend trying to update laboratory supervision"
            });
        })

}

const deleteById = (req, res)=>{
    let supervise = req.body;

    if(!supervise._id){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    Supervise.deleteOne({_id:supervise._id})
        .then(deleted=>{
            res.status(200).json({
                message: "delete supervise was successful"
            });
        })
        .catch(err=>{
            res.status(500).json({
                message: "Something happend trying to delete the supervise"
            });
        })
}

/**
 * METHOD = GET
 */
const getAll = (req, res)=>{
        Supervise.find((err, supervisions)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to get the supervise",
        });

        if(supervisions){
            res.status(200).json(supervisions);
        }else{
            res.status(404).json({
                message: "There aren't any supervisions",
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

    Supervise.findById(id, (err, supervise)=>{
        if(err) return res.status(500).json({
            message: "Something went wrong trying to get all supervisions",
        });

        if(supervise){
            res.status(200).json(supervise);
        }else{
            res.status(404).json({
                message: `There isn't any supervision with id ${id}`,
            });
        }
    });  
}

const panic = (req, res)=>{
    Spervise.deleteMany({}, (err)=>{
        res.status(200).send("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
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