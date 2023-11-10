var express = require('express');
var router = express.Router();

const results = [
  {
    make: 'Toyota',
    model: 'Camry',
    price: 25000
  },
  {
    make: 'Honda',
    model: 'Civic',
    price: 22000
  },
  {
    make: 'Ford',
    model: 'F-150',
    price: 35000
  }
]


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cars', { title: 'Search Results - cars', results: results });
});



module.exports = router;
