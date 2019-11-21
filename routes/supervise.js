var express = require('express');
var router = express.Router();
const SuperviseController = require("../controllers/supervise_controller");

router.get('/', SuperviseController.getAll);
router.get('/:id', SuperviseController.getOneById);

router.post('/', SuperviseController.insert);

router.put('/', SuperviseController.update);

router.delete('/', SuperviseController.deleteById);

router.get('/panic/all',SuperviseController.panic);
module.exports = router;