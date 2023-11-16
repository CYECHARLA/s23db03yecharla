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

// Handle Car update form on PUT.
exports.car_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Car update PUT' + req.params.id);
};

// Handle Car detail on GET.
exports.car_detail = async function (req, res) {
    console.log("detail " + req.params.id);
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            
            res.status(404).send("No instance to show details");
            return;
        }
        res.send(car);
    } catch (err) {
        res.status(500).send(`{"error": "${err}"}`);
    }
};



// Handle Car update form on PUT.
exports.car_update_put = async function (req, res) {
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

// Handle Car delete on DELETE.
exports.Car_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Car.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.car_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Car.findById(req.query.id)
        res.render('cardetail',
            { title: 'car Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a car.
// No body, no in path parameter, no query.
// Does not need to be async
exports.car_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('carcreate', { title: 'car Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a car.
// query provides the id
exports.car_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Car.findById(req.query.id)
        if (!result) {
        
            res.status(404).send("No instance to update");
            return;
        }
        res.render('carupdate', { title: 'Car Update', toShow: result });
    }
    catch (err) {
        res.status(500).send(`{'error': '${err}'}`);
    }
};


// Handle a delete one view with id from query
exports.car_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await Car.findById(req.query.id)
        res.render('cardelete', {
            title: 'car Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};