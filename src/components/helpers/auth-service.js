import { BehaviorSubject } from "rxjs";

import { handleResponse } from "./response-handler";
import { SIGN_IN } from "../../constants/routes";
import { SIGN_UP } from "../../constants/routes";

const apiUrl = "http://localhost:5000";

const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
    signin,
    signup,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    }
};

function signin(email, password) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email, password } })
    };

    return fetch(apiUrl + SIGN_IN, requestOptions)
        .then(handleResponse)
        .then((user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function signup(email, password) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email, password } })
    };

    return fetch(apiUrl + SIGN_UP, requestOptions).then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    currentUserSubject.next(null);
}
