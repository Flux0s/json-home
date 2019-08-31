let mongoose = require("mongoose");

const lightProperties = {
    on: Boolean
};

const deviceSchema = new mongoose.Schema({
    // Properties
    Type: String
    // Operations
});

module.exports = (type) => {
    return mongoose.model("Device", deviceSchema);
};
