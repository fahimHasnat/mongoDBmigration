const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    occupation: String,
    date: {
        type: String,
        default: new Date()
    }
});

module.exports = mongoose.model("Customer", customerSchema);