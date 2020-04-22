const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: String
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Types", TypeSchema);