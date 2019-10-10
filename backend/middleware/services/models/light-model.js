let mongoose = require('mongoose');

const lightSchema = new mongoose.Schema({
  Name: { type: String, required: true, unique: true },
  Location: String,
  On: Boolean,
  Color: {
    type: String,
    set: (s) => {
      if (!s.match(/#[A-F|a-f|0-9]{6}/g))
        throw new Error('Attempted to set invalid light color');
      else return s;
    }
  }
});

lightSchema.methods.togglePower = (cb) => {
  this.On = !this.On;
  return Promise.resolve(this.On);
};

template = { Name: null, Location: null, Color: null };

module.exports = {
  model: mongoose.model('Light', lightSchema),
  template: template
};