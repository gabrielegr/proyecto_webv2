var express = require('express');
var router = express.Router();
const ReserveController = require("../controllers/reserve_controller");

router.get('/', ReserveController.getAll);
router.get('/:id', ReserveController.getOneById);

router.post('/', ReserveController.insert);

router.put('/', ReserveController.update);

router.delete('/', ReserveController.deleteById);

router.get('/panic/all',ReserveController.panic);
module.exports = router;