var express = require('express');
var router = express.Router();
const UserController = require("../controllers/user_controller.js");


router.get('/all', UserController.getAll);
router.get('/:name', UserController.getOneById);

router.post('/', UserController.insert);

router.put('/:name', UserController.update);

router.delete('/:name', UserController.deleteById);

module.exports = router;