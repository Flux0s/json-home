import { handleResponse } from './response-handler';
import { authenticationService } from './auth-service';

const apiUrl = 'http://localhost:5000';

const baseHeadersObject = (token) => ({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + token
});

// Light Resource
// TODO: Add filter to this request
function getLights() {
    const requestOptions = {
        method: 'GET',
        headers: baseHeadersObject(authenticationService.currentUserValue.token)
    };
    return fetch(apiUrl + '/lights', requestOptions).then(handleResponse);
}
function getEmptyDevice() {
    // const requestOptions = {
    //     method: 'GET',
    //     headers: baseHeadersObject(authenticationService.currentUserValue.token)
    // };
    // return fetch(apiUrl + API.getEmptyDevice, requestOptions).then(
    //     handleResponse
    // );
}
// function getDeviceTypes() {
//     const requestOptions = {
//         method: "GET",
//         headers: baseHeadersObject(authenticationService.currentUserValue.token)
//     };
//     return fetch(apiUrl + API.getDeviceTypes, requestOptions).then(
//         handleResponse
//     );
// }
function addDevice(device) {
    // const requestOptions = {
    //     method: 'PUT',
    //     headers: baseHeadersObject(
    //         authenticationService.currentUserValue.token
    //     ),
    //     body: JSON.stringify(device)
    // };
    // return fetch(apiUrl + API.addDevice, requestOptions).then(handleResponse);
}

// API export
export const api = {
    getLights
    // getLightByName,
    // getEmptyLightObject,
    // addNewLightObject
};
