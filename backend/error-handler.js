module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof err === "string") {
        // custom application error
        if (process.env.NODE_ENV === "development")
            return res.status(400).json({ message: err });
        else
            return res
                .status(400)
                .send(
                    "400 The server experienced some error processing your request."
                );
    }

    if (err.name === "UnauthorizedError") {
        // jwt authentication error
        if (process.env.NODE_ENV === "development")
            return res.status(401).json({ message: "Invalid Token" });
        else return res.status(401).send("401 Unauthorized");
    }

    // default to 500 server error
    if (process.env.NODE_ENV === "development")
        return res.status(500).json({ message: err.message });
    else
        return res
            .status(500)
            .send(
                "500 The server experienced internal error processing your request."
            );
}
