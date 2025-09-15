const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');
const validateDrugData = require('../middleware/validation');

route.get('/', services.home);
route.get('/manage', services.manage);
route.get('/dosage', services.dosage);
route.get('/purchase', services.purchase);
route.get('/add-drug', services.addDrug);
route.get('/update-drug', services.updateDrug);

// API for CRUD operations
route.post('/api/drugs', validateDrugData, controller.create);
route.get('/api/drugs', controller.find);
route.put('/api/drugs/:id', validateDrugData, controller.update);
route.delete('/api/drugs/:id', controller.delete);

module.exports = route;
