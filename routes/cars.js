var express = require("express");
const car_controlers = require("../controllers/CarController");
var router = express.Router();
// GET carss
router.get("/", car_controlers.car_view_all_Page);
module.exports = router;