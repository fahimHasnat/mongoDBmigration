const Customer = require("../models/Customer");

module.exports.up = async () => {
    try {
        const customers = await Customer.find({ last_name: { $exists: false } });
        if (customers.length != 0) {
            customers.map(async result => {
                const { name } = result._doc;
                const lastName = result.lastName = name.split(' ')[1]
                const firstname = result.firstName = name.split(' ')[0]

                await Customer.updateOne({ _id: result._doc._id }, { $set: { "first_name": firstname, "last_name": lastName }, $unset: { "name": "" } });
            })
            return 'Customer names has been updated'
        }

        return 'All customers have already updated value';

    } catch (err) {
        throw err;
    }
}

module.exports.down = async (next) => {
    try {
        try {
            const customers = await Customer.find({ last_name: { $exists: true } });
            if (customers.length != 0) {
                customers.map(async result => {
                    const { first_name, last_name } = result._doc;
                    const name = first_name.concat(" ", last_name);

                    await Customer.updateOne({ _id: result._doc._id }, { $unset: { "first_name": "", "last_name": "" }, $set: { "name": name } });
                });
                return 'Customer names has been updated';
            }
            return 'All customers have already updated value';



        } catch (err) {
            throw err;
        }
    } catch (err) {
        next(err);
    }
}