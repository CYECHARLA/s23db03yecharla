var express = require("express");
const car_controlers = require("../controllers/CarController");
var router = express.Router();
// GET carss
router.get("/", car_controlers.car_view_all_Page);

// GET request for one car.
router.get('/cars/:id', car_controlers.car_detail);

// PUT request to update a car.
router.put('/cars/:id', car_controlers.car_update_put);

/* GET detail car page */
router.get('/detail', car_controlers.car_view_one_Page);

/* GET create car page */
router.get('/create', car_controlers.car_create_Page);

/* GET create update page */
router.get('/update', car_controlers.car_update_Page);

/* GET delete car page */
router.get('/delete', car_controlers.car_delete_Page);

module.exports = router;

