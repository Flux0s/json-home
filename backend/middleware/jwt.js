const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

module.exports = {
    jwtMiddleware: (config) => {
        return expressJwt({
            secret: jwtSecret,
            getToken: (req) => {
                if (
                    req.headers.authorization &&
                    req.headers.authorization.split(" ")[0] === "Bearer"
                ) {
                    return req.headers.authorization.split(" ")[1];
                }
                return null;
            }
        }).unless({
            path: [
                // public routes that don't require authentication
                "/",
                "/auth/sign-in",
                "/auth/sign-up"
            ]
        });
    },
    generateJWT: (userID) => {
        const token = jwt.sign({ uid: userID }, config.secret, {
            expiresIn: config.expire
        });
        // console.log("Generated JWT for authenticated user: ", token);
        return token;
    }
};
