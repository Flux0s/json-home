let mongoose = require("mongoose");

const lightSchema = new mongoose.Schema({
  Name: { type: String, required: true, unique: true },
  Location: String,
  Color: {
    type: String,
    set: (s) => {
      if (!s.match(/#[A-F|a-f|0-9]{8}/g))
      throw new Error("Attempted to set invalid light color");
      else return s;
    }
  },
  On: Boolean
});

lightSchema.methods.togglePower = (cb) => {
  this.On = !this.On;
  return Promise.resolve(this.On);
};

// template = { Name: "", Location: "", Color: "" };

module.exports = mongoose.model("Light", lightSchema);
