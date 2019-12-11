let mongoose = require("mongoose");

module.exports = {
  initialize: (config) => {
    mongoose.connect(config.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
};
