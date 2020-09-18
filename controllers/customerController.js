const Customer = require('../models/Customer');

exports.createCustomer = async (req, res, next) => {
    try {
        console.log("createCustomer :", req.body);
        let {
            name, age, gender, occupation
        } = req.body;

        try {
            const customer = new Customer({
                name, age, gender, occupation
            });
            const result = await customer.save();
            res.json(result);
        } catch (err) {
            const error = new Error(err.name);
            error.statusCode = 404;
            error.data = null;
            throw error;
        }

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getCustomer = async (req, res, next) => {
    try {

        const customer = await Customer.findById(req.params.id).exec();
        console.log(customer);

        if (customer == null) {
            const error = new Error("Nothing Found");
            error.statusCode = 404;
            error.data = null;
            throw error;
        }
        res.json(customer);

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getCustomers = async (req, res, next) => {
    try {

        const customers = await Customer.find({}).exec();

        if (customers == null) {
            const error = new Error(err.name);
            error.statusCode = 404;
            error.data = null;
            throw error;
        }

        res.json(customers);

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}