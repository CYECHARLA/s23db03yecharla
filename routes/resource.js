var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var car_controller = require('../controllers/CarController');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// CAR ROUTES ///
// POST request for creating a Car.
router.post('/cars', car_controller.car_create_post);
// DELETE request to delete Car.
router.delete('/cars/:id', car_controller.car_delete);
// PUT request to update Car.
router.put('/cars/:id', car_controller.car_update_put);
// GET request for one Car.
router.get('/cars/:id', car_controller.car_detail);
// GET request for list of all Car items.
router.get('/cars', car_controller.car_list);
module.exports = router;