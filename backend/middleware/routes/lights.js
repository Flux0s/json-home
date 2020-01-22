let express = require("express");
let router = express.Router();
let lightService = require("../services/light-service");

// Get all devices
// TODO: add filtering and sorting options in the query string
router.get("/", (req, res, next) => {
  if (req.query["schema"] === "true") {
    lightService
      .getLightSchema()
      .then((light) => res.json(light))
      .catch((err) => next(err));
  } else {
    lightService
      .getLights()
      .then((lights) => res.json(lights))
      .catch((err) => next(err));
  }
});
// Get a specific device
router.get("/:id", (req, res, next) => {
  console.log("Received a request for light with id: " + req.params.id);

  next(new Error("This API endpoint has not been implemented yet"));
  return;
});
router.put("/", (req, res, next) => {
  lightService
    .addNewLightObject(req.body)
    .then((newLightList) => res.json(newLightList))
    .catch((err) => next(err));
});
router.post("/:id", (req, res, next) => {
  lightService
    .updateExistingLight(req.params.id, req.body)
    .then(() => {})
    .catch((err) => next(err));
  return;
});
module.exports = router;
