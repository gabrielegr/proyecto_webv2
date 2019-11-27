var express = require('express');
var router = express.Router();
const UserController = require("../controllers/user_controller.js");


router.get('/all', UserController.getAll);
router.get('/:nombre', UserController.getOne);

router.post('/', UserController.register);

router.put('/:nombre', UserController.update);

router.delete('/:nombre', UserController.delete);

module.exports = router;