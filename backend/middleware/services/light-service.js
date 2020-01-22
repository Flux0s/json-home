let lightModel = require("./models/light-model").model;
let lightTemplate = require("./models/light-model").template;
const socketEmitter = require("../socket.io").socketEmitter;

//
// TODO: Extract manipulation of buisness objects to buisness logic layer
//

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

// NOTE: This method is depreciated. This was moved into the buisness logic of the front end light service.
let getEmptyLightObject = () => {
  return Promise.resolve(lightTemplate);
};

let getLightSchema = () => {
  let lightSchema = {};
  for (var path in lightModel.schema.paths)
    if (path.indexOf("_") == -1)
      lightSchema[path] = {
        type: lightModel.schema.paths[path].instance,
        required: lightModel.schema.paths[path].isRequired
      };
  return Promise.resolve(lightSchema);
};

// Clients should use getEmptyLightObject to get correct parameter format
// Returns: List of lights after adding the new object, or err if failed validation or during save operation
let addNewLightObject = (lightObject) => {
  newLightObject = new lightModel(lightObject);
  console.log(JSON.stringify(lightObject));
  let validationError = newLightObject.validateSync();
  if (validationError) return Promise.reject(validationError);
  else {
    return newLightObject.save((err) => {
      if (err) return Promise.reject(err);
      else return getLights();
    });
  }
};

async function updateExistingLight(id, lightObject) {
  // socketEmitter.emit("test", "data");
  const light = await lightModel.findOne({ _id: id }, (err, light) => {
    return err ? Promise.reject(err) : Promise.resolve(light);
  });
  console.log(JSON.stringify(light));
  Object.keys(lightObject)
    .filter((field) => field.indexOf("_") == -1)
    .forEach((field) => {
      light[field] = lightObject[field];
    });
  let test = light.validateSync();
  console.log(test);
  return Promise.reject(
    new Error("Problem encountered in service call to updateExistingLight")
  );
}

module.exports = {
  getLights,
  getLightByName,
  getLightById,
  getLightSchema,
  addNewLightObject,
  updateExistingLight
};
