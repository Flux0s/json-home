const schema = require("schm");

const deviceSchema = schema({
    id: Number,
    deviceType: String,
    location: String,
    state: String,
    options: String
});

module.exports = {
    deviceSchema
};
