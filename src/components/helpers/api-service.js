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
            "Access-Control-Allow-Origin": "*",
            Authorization:
                "Bearer " + authenticationService.currentUserValue.token
        }
    };
    return fetch(apiUrl + API.getDevices, requestOptions).then(handleResponse);
}

// API export

export const api = {
    getDevices
};
