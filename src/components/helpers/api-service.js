import { handleResponse } from "./response-handler";
import { API } from "../../constants/routes";
import { authenticationService } from "./auth-service";

const apiUrl = "http://localhost:5000";

// API function abstractions

function getDevices() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + authenticationService.currentUserValue.token
        }
    };
    console.log(authenticationService.currentUserValue);
    return fetch(apiUrl + API.getDevices, requestOptions).then(handleResponse);
}

// API export

export const api = {
    getDevices
};
