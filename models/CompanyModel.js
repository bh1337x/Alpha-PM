const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
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

module.exports = mongoose.model("Companies", CompanySchema);