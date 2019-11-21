const Laboratory = require("../models/laboratory")

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

    if(!req.body.numero || !req.body.puestos){
        return res.status(400).json({
            message: "There are missing fields",
        });
    }
    
    let laboratory = new Laboratory(
        req.body
    );

    laboratory.save((err, nLaboratory)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to insert laboratory",
        });

        res.status(200).json({
            message: "Insert laboratory was successful",
            laboratory: nLaboratory
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
    let laboratory = req.body
    
    //console.log(register._id);
    

    if(!laboratory._id){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    Laboratory.update({_id: laboratory._id}, laboratory)
        .then(value =>{
            res.status(200).json({
                message: "update laboratory was successful"
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Something happend trying to update the labortory"
            });
        })

}

const deleteById = (req, res)=>{
    let laboratory = req.body;

    if(!laboratory._id){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    Laboratory.deleteOne({_id:laboratory._id})
        .then(deleted=>{
            res.status(200).json({
                message: "delete laboratory was successful"
            });
        })
        .catch(err=>{
            res.status(500).json({
                message: "Something went wrong trying to delete laboratory"
            });
        })
}

/**
 * METHOD = GET
 */
const getAll = (req, res)=>{
        Laboratory.find((err, laboratories)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to get the laboratory",
        });

        if(laboratories){
            res.status(200).json(laboratories);
        }else{
            res.status(404).json({
                message: "There aren't any laboratories",
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

    Laboratory.findById(id, (err, laboratory)=>{
        if(err) return res.status(500).json({
            message: "Something went wrong trying to get all laboratories",
        });

        if(laboratory){
            res.status(200).json(laboratory);
        }else{
            res.status(404).json({
                message: `There isn't any laboratory with id ${id}`,
            });
        }
    });  
}

const panic = (req, res)=>{
    Laboratory.deleteMany({}, (err)=>{
        res.status(200).send("This is so sad. Alexa play Linkin Park What I've Done.");
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