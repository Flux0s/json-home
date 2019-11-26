let lightModel = require("./models/light-model").model;
let lightTemplate = require("./models/light-model").template;
const socketEmitter = require("../socket.io").socketEmitter;

// TODO: Add filtering parameter
let getLights = () =>
  lightModel.find({}, { __v: false }, (err, lights) => {
    if (err) {
      // console.log(err);
      return Promise.reject(err);
    } else {
      // console.log(JSON.stringify(lights));
      Promise.resolve(JSON.stringify(lights));
    }
  });
let getLightById = (id) => {
  let light = lightModel.findOne({ _id: id });
  console.log(light);
};

let getLightByName = (name) => {
  let light = lightModel.findOne({ Name: name });
  console.log(light);
};

let getEmptyLightObject = () => {
  socketEmitter.emit("test", "data");
  return Promise.resolve(lightTemplate);
};

// Clients should use getEmptyLightObject to get correct parameter format
// Returns: List of lights after adding the new object, or err if failed validation or during save operation
let addNewLightObject = (lightObject) => {
  newLightObject = new lightModel(lightObject);
  let validationError = newLightObject.validateSync();
  if (validationError) return Promise.reject(validationerror);
  else {
    return newLightObject.save((err) => {
      if (err) return Promise.reject(err);
      else return getLights();
    });
  }
};

module.exports = {
  getLights,
  getLightByName,
  getEmptyLightObject,
  addNewLightObject
};
