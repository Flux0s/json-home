import app from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();

        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
}

export default Firebase;
