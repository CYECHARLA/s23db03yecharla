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

// Handle Car detail on GET.
exports.car_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        const car = await Car.findById(req.params.id);
        if (car == null) {
            res.status(404);
            res.send(`{"error": "Car not found"}`);
        } else {
            res.send(car);
        }
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Car update form on PUT.
exports.car_update_put = async function(req, res) {
    console.log(`Update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Car.findById(req.params.id);

        // Check if the document exists
        if (!toUpdate) {
            res.status(404).send(`{"error": "Car with ID ${req.params.id} not found"}`);
            return;
        }

        // Do updates of properties
        if (req.body.Make) toUpdate.Make = req.body.Make;
        if (req.body.Model) toUpdate.Model = req.body.Model;
        if (req.body.Price) toUpdate.Price = req.body.Price;

        // Handle checkbox (assuming it's named checkboxsale in the body)
        if (req.body.checkboxsale) {
            toUpdate.sale = true;
        } else {
            toUpdate.sale = false;
        }

        let result = await toUpdate.save();

        // Include the sale property in the response
        result = result.toObject(); // Convert Mongoose document to a plain JavaScript object
        result.sale = toUpdate.sale;

        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500).send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};


