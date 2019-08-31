let mongoose = require("mongoose");

module.exports = {
    initalize: (config) => {
        mongoose.connect(config.uri, {
            useNewUrlParser: true
        });
    }
};
