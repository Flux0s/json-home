let express = require('express');
let router = express.Router();
let lightService = require('../services/light-service');

// Get all devices
// TODO: add filtering and sorting options in the query string
router.get('/', (req, res, next) => {
  //   console.log('Received GET request for /lights');
  lightService
    .getLights()
    .then((lights) => res.json(lights))
    .catch(next);
});
// Get a specific device
router.get('/:id', (req, res) => {
  console.log('Received request for light with id: ' + req.params.id);

  next('This API endpoint has not been implemented yet');
  return;
});
module.exports = router;
