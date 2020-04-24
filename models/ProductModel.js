const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "NULL"
    },
    generic: {
        type: String,
        default: ""
    },
    size: {
        type: String,
        default: "NULL"
    },
    company: {
        type: String,
        default: "NULL"
    },
    price: {
        type: Number,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Products", ProductSchema);