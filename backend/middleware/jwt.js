const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpire = process.env.JWT_EXPIRE;

module.exports = {
    jwtMiddleware: function() {
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
                "/sign-in",
                "/sign-up"
            ]
        });
    },
    generateJWT: function(userID) {
        const token = jwt.sign({ uid: userID }, jwtSecret, {
            expiresIn: jwtExpire
        });
        console.log("Generated JWT for authenticated user: ", token);
        return token;
    }
};
