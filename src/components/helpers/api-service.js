import { handleResponse } from "./response-handler";
import { API } from "../../constants/routes";
import { authenticationService } from "./auth-service";

const apiUrl = "http://localhost:5000";

const baseHeadersObject = (token) => ({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + token
});

// API function abstractions

function getDevices() {
    const requestOptions = {
        method: "GET",
        headers: baseHeadersObject(authenticationService.currentUserValue.token)
    };
    return fetch(apiUrl + API.getDevices, requestOptions).then(handleResponse);
}

function addDevice(device) {
    const requestOptions = {
        method: "PUT",
        headers: baseHeadersObject(
            authenticationService.currentUserValue.token
        ),
        body: JSON.stringify(device)
    };
    return fetch(apiUrl + API.getDevices, requestOptions).then(handleResponse);
}

// API export

export const api = {
    getDevices,
    addDevice
};
