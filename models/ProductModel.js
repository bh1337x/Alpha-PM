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
        default: "NONE"
    },
    generic: {
        type: String,
        default: "NONE"
    },
    size: {
        type: String,
        default: "NONE"
    },
    company: {
        type: String,
        default: "NONE"
    },
    price: {
        type: Number,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Products", ProductSchema);