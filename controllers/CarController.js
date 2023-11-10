var Car = require('../models/car');

exports.car_list = async function (req, res) {
    try {
        theCars = await Car.find();
        res.send(theCars);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// VIEWS
// Handle a show all view
exports.car_view_all_Page = async function (req, res) {
    try {
        theCars = await Car.find();
        res.render('cars', { title: 'Car Search Results', results: theCars });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.car_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Car detail: ' + req.params.id);
};

exports.car_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Car();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"Make":"Toyata", "Model":camry, "Price":"$25000"}
    document.Make = req.body.Make;
    document.Model = req.body.Model;
    document.Price = req.body.Price;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Car delete form on DELETE.
exports.car_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Car delete DELETE ' + req.params.id);
};
// Handle Car update form on PUT.
exports.car_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Car update PUT' + req.params.id);
};