const schema = require("schm");

module.exports = {
    deviceSchema
};

const deviceSchema = schema({
    id: Number,
    deviceType: String,
    location: String,
    state: String,
    options: String
});
