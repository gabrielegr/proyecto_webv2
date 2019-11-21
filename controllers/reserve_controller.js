const Reserve = require("../models/reserve")

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

    if(!req.body.hfin || !req.body.hinicio || !req.body.usuario || !req.body.fecha || !req.body.cantidad || !req.body.descripcion){
        return res.status(400).json({
            message: "There are missing fields",
        });
    }
    
    let reserve = new Reserve(
        req.body
    );

    reserve.save((err, nReserve)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to insert reserve",
        });

        res.status(200).json({
            message: "Insert reserve was successful",
            reserve: nReserve
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
    let reserve = req.body
    
    //console.log(register._id);
    

    if(!reserve._id){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    Reserve.update({_id: reserve._id}, reserve)
        .then(value =>{
            res.status(200).json({
                message: "update reserve was successful"
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Something happend trying to update the reserve"
            });
        })

}

const deleteById = (req, res)=>{
    let reserve = req.body;

    if(!reserve._id){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    Reserve.deleteOne({_id:reserve._id})
        .then(deleted=>{
            res.status(200).json({
                message: "delete reserve was successful"
            });
        })
        .catch(err=>{
            res.status(500).json({
                message: "Something went wrong trying to delete reserve"
            });
        })
}

/**
 * METHOD = GET
 */
const getAll = (req, res)=>{
        Reserve.find((err, reserves)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to get the reserve",
        });

        if(reserves){
            res.status(200).json(reserves);
        }else{
            res.status(404).json({
                message: "There aren't any reserves",
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

    Reserve.findById(id, (err, reserve)=>{
        if(err) return res.status(500).json({
            message: "Something went wrong trying to get all reserves",
        });

        if(reserve){
            res.status(200).json(reserve);
        }else{
            res.status(404).json({
                message: `There isn't any reserve with id ${id}`,
            });
        }
    });  
}

const panic = (req, res)=>{
    Reserve.deleteMany({}, (err)=>{
        res.status(200).send("*SNAP*");
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