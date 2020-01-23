let express = require("express");
let router = express.Router();
let lightService = require("../services/light-service");

// Get all light
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
// Get a specific light
router.get("/:id", (req, res, next) => {
  console.log("Received a request for light with id: " + req.params.id);

  next(new Error("This API endpoint has not been implemented yet"));
  return;
});
// Add a new light
router.put("/", (req, res, next) => {
  lightService
    .addNewLightObject(req.body)
    .then((newLightList) => res.json(newLightList))
    .catch((err) => next(err));
});
// Update existing light (by _id)
router.post("/:id", (req, res, next) => {
  lightService
    .updateExistingLight(req.params.id, req.body)
    .then(() => res.status(200).send())
    .catch((err) => next(err));
});
// Delete existing light
router.delete("/:id", (req, res, next) => {
  lightService
    .deleteLight(req.params.id, req.body)
    .then(() => res.status(200).send())
    .catch((err) => next(err));
});
module.exports = router;
