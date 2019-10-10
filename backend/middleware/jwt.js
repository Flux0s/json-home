const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
let settings;

module.exports = {
  jwtMiddleware: (config) => {
    settings = config;
    return expressJwt({
      secret: settings.secret,
      getToken: (req) => {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
          return req.headers.authorization.split(' ')[1];
        }
        return null;
      }
    }).unless({
      path: [
        // public routes that don't require authentication
        '/',
        '/auth/sign-in',
        '/auth/sign-up'
      ]
    });
  },
  generateJWT: (userID) => {
    const token = jwt.sign({ uid: userID }, settings.secret, {
      expiresIn: settings.expire
    });
    // console.log("Generated JWT for authenticated user: ", token);
    return token;
  }
};
