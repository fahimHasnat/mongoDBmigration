const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    age: String,
    gender: String,
    occupation: String,
    date: {
        type: String,
        default: new Date()
    }
}, { strict: false });

module.exports = mongoose.model("Customer", customerSchema);