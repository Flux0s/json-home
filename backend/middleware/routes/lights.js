let express = require("express");
let router = express.Router();
let lightService = require("../services/light-service");

// Get all devices
// TODO: add filtering and sorting options in the query string
router.get("/", (req, res, next) => {
  if (req.query["empty"] === "true") {
    lightService
      .getEmptyLightObject()
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

  next("This API endpoint has not been implemented yet");
  return;
});
router.put("/", (req, res, next) => {
  console.log(
    "Received a request to add new light with content: " +
      JSON.stringify(req.body)
  );

  next("This API endpoint is currently in development");
  return;
});
router.post("/:id", (req, res, next) => {
  console.log("Received a request to update light with id: " + req.params.id);

  next("This API endpoint is currently in development");
  return;
});
module.exports = router;
