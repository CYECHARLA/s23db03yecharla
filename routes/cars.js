var express = require("express");
const car_controlers = require("../controllers/CarController");
var router = express.Router();

// Sample middleware for basic authentication
const authenticate = (req, res, next) => {
  // You can implement your authentication logic here
  // For example, check if the user is logged in or has the necessary permissions
  const isLoggedIn = /* Logic to check if user is logged in */;
  if (isLoggedIn) {
    next(); // Continue to the next middleware/route handler if authenticated
  } else {
    res.status(401).send("Unauthorized"); // Unauthorized access
  }
};

// GET cars
router.get("/", car_controlers.car_view_all_Page);

// GET request for one car.
router.get('/cars/:id', car_controlers.car_detail);

// PUT request to update a car.
router.put('/cars/:id', car_controlers.car_update_put);

/* GET detail car page */
router.get('/detail', car_controlers.car_view_one_Page);

/* GET create car page - Protected with authentication middleware */
router.get('/create', authenticate, car_controlers.car_create_Page);

/* GET update car page */
router.get('/update', car_controlers.car_update_Page);

/* GET delete car page - Protected with authentication middleware */
router.get('/delete', authenticate, car_controlers.car_delete_Page);

module.exports = router;
