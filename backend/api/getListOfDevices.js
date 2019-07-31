module.exports = getDevices;

function getDevices(req, res, next) {
    // next("This API endpoint has not been implemented yet");
    setTimeout(function() {
        return res.status(200).json([
            {
                id: 1,
                name: "Server Stored Device",
                description: "This device was retrieved from the server."
            }
        ]);
    }, 5000);
}
