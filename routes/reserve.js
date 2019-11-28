var express = require('express');
var router = express.Router();
const ReserveController = require("../controllers/reserve_controller");

router.get('/reserve', ReserveController.getAll);
router.get('/:id', ReserveController.getOneById);
router.get('/panic/all',ReserveController.panic);

router.post('/', ReserveController.insert);

router.put('/', ReserveController.update);

router.delete('/', ReserveController.deleteById);

module.exports = router;