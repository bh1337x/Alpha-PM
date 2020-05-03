const mongoose = require("mongoose");

const GenericSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Generics", GenericSchema);