const dotenv = require("dotenv");
// Read the .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
    port: process.env.PORT,
    database: {
        uri: process.env.MONGO_DATABSE_URI
    },
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectID: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        adminEmail: process.env.FIREBASE_ADMIN_EMAIL,
        appID: process.env.FIREBASE_APP_ID
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expire: process.env.JWT_EXPIRE
    }
};
