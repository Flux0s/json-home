import { handleResponse } from "./response-handler";
import { API } from "../../constants/routes";
import { authenticationService } from "./auth-service";

const apiUrl = "http://localhost:5000";

export const api = {
    getDevices
};

function getDevices() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + authenticationService.currentUserValue.token
        }
    };

    return (
        fetch(apiUrl + API.getDevices, requestOptions)
            .then(handleResponse)
            // .then((devices) => {
            //     return devices;
            // })
            .catch((error) => {
                return Promise.reject(error);
            })
    );
}
