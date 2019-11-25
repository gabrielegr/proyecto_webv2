
var express = require('express');
var router = express.Router();
const UserController = require("../controllers/user_controller.js");


router.get('/all', UserController.getAll);
router.get('/:id', UserController.getOneById);
router.post('/', UserController.insert);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.deleteById);

router.get('/panic/all',UserController.panic);
module.exports = router;