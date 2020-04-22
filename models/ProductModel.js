const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    generic: {
        type: String,
    },
    size: {
        type: String,
    },
    company: {
        type: String,
    },
    price: {
        type: String,
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Products", ProductSchema);