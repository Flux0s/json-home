import axios from "axios";

export const doSignInWithGoogle = () => {
    console.log(
        "Warning! Attempted to request sign in with google. This functionality is depreciated."
    );
    // axios
    //     .post("http://localhost:5000/sign-in", {
    //         headers: {
    //             "Access-Control-Allow-Origin": "http://localhost:5000"
    //         }
    //     })
    //     .then(function(response) {
    //         console.log(response);
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     });
};
export const doSignInWithEmailAndPassword = (email, password) => {
    console.log("Sending sign in request with e-mail and password");
    axios
        .post(
            "http://localhost:5000/sign-in",
            {
                user: {
                    email: email,
                    password: password
                }
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
};

export const doSignUpWithEmailAndPassword = (email, password) => {
    console.log("Sending sign up request with e-mail and password...");
    axios
        .post(
            "http://localhost:5000/sign-up",
            {
                user: {
                    email: email,
                    password: password
                }
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
};
