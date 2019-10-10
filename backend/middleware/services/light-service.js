let lightModel = require('./models/light-model');

// TODO: Add filtering parameter
let getLights = () =>
  lightModel.find({}, (err, lights) => {
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
  let emptyLightObject = new lightModel({ name: 'testLight' });
  console.log(emptyLightObject);
  // return
};

// Use getEmptyLightObject to get correct parameter format
let addNewLightObject = (lightObject) => {
  newLightObject = new lightModel(lightObject);
  console.log(newLightObject);
};

module.exports = {
  getLights,
  getLightByName,
  getEmptyLightObject,
  addNewLightObject
  // addDevice(req, res, next) {
  //     // const number = new Number();

  //     // console.log(number);
  //     // if (schemas.deviceSchema.validate(req.body.device)) {
  //     //     next("Device in response did not match schema");
  //     //     return;
  //     // }
  //     // const deviceObject = schemas.deviceSchema.parse(req.body.device);
  //     next("This API endpoint has not been implemented yet");
  //     return;

  //     const devicesObjectPath = "/devices/";
  //     Firebase.appendToDatabase(devicesObjectPath)
  //         .then(function(snapshot) {
  //             // console.log(snapshot.val());
  //             // res.send(snapshot.val());
  //         })
  //         .catch(function(error) {
  //             next("Encountered error while adding new device: " + error);
  //         });
  // },
  // getEpmtyDevice(req, res, next) {
  //     // next("This API endpoint has not been implemented yet");
  //     const devicesObjectPath = "/devices/";
  //     // setTimeout(function() {
  //     Firebase.getFromDatabase(devicesObjectPath)
  //         .then(function(snapshot) {
  //             // console.log(snapshot.val());
  //             res.send(snapshot.val());
  //         })
  //         .catch(function(error) {
  //             next(
  //                 "Encountered error while getting list of devices: " + error
  //             );
  //         });
  //     // }, 3500);
  // },
  // getDeviceTypes(req, res, next) {
  //     // next("This API endpoint has not been implemented yet");
  //     const deviceTypesObjectPath = "/deviceTypes/";
  //     // setTimeout(function() {
  //     Firebase.getFromDatabase(deviceTypesObjectPath)
  //         .then(function(snapshot) {
  //             // console.log(snapshot.val());
  //             res.send(snapshot.val());
  //         })
  //         .catch(function(error) {
  //             next(
  //                 "Encountered error while getting list of device types: " +
  //                     error
  //             );
  //         });
  //     // }, 3500);
  // }
};
