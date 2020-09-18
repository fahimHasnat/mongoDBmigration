const Customer = require("../models/Customer");
const moment = require('moment');

module.exports.up = async () => {
    try {
        const customers = await Customer.find({ year_of_birth: { $exists: false } });
        if (customers.length != 0) {
            customers.map(async result => {
                await Customer.updateOne({ _id: result._doc._id }, { $set: { "year_of_birth": (moment().format('YYYY') - result._doc.age) } });
            })
            return `Customers' year of birth has been added`
        }

        return 'All customers have year of birth';

    } catch (err) {
        throw err;
    }
}

module.exports.down = async (next) => {
    try {
        try {
            const customers = await Customer.find({ year_of_birth: { $exists: true } });
            if (customers.length != 0) {
                customers.map(async result => {

                    await Customer.updateOne({ _id: result._doc._id }, { $unset: { "year_of_birth": "" } });
                });
                return 'Customer year of birth has been removed';
            }
            return 'No customer has year of birth';



        } catch (err) {
            throw err;
        }
    } catch (err) {
        next(err);
    }
}