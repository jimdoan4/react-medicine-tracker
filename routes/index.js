const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController.js');
const userController = require('../controllers/userController');
const medicineController = require('../controllers/medicineController');

router.get('/', appController.index);

router.get('/users/', userController.index);
router.post('/users/', userController.create);
router.get('/users/:userId/', userController.show);
router.put('/users/:userId/', userController.update);
router.delete('/users/:userId/', userController.delete);

router.get('/users/:userId/medicines/', medicineController.index);
router.post('/users/:userId/medicines/', medicineController.create);
router.get('/users/:userId/medicines/:medicineId/', medicineController.show);
router.put('/users/:userId/medicines/:medicineId/', medicineController.update);
router.delete('/users/:userId/medicines/:medicineId/', medicineController.delete);


module.exports = router;
