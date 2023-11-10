var express = require("express");
const car_controlers = require("../controllers/CarController");
var router = express.Router();
// GET carss
router.get("/", car_controlers.car_view_all_Page);

// GET request for one car.
router.get('/cars/:id', car_controlers.car_detail);

// PUT request to update a car.
router.put('/cars/:id', car_controlers.car_update_put);

module.exports = router;

