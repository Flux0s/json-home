import { handleResponse } from "./response-handler";
import { authenticationService } from "./auth-service";

const apiUrl = "http://localhost:5000";
const lightEndpoint = "/lights";

const baseHeadersObject = (token) => ({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: "Bearer " + token
});

// Light Resource
// TODO: Add filter to this request
function getLights() {
  const requestOptions = {
    method: "GET",
    headers: baseHeadersObject(authenticationService.currentUserValue.token)
  };
  return fetch(apiUrl + lightEndpoint, requestOptions).then(handleResponse);
}
function getEmptyLight() {
  const requestOptions = {
    method: "GET",
    headers: baseHeadersObject(authenticationService.currentUserValue.token)
  };
  return fetch(apiUrl + lightEndpoint + "?empty=true", requestOptions).then(
    handleResponse
  );
}
function addNewLight(device) {
  const requestOptions = {
    method: "PUT",
    headers: baseHeadersObject(authenticationService.currentUserValue.token),
    body: JSON.stringify(device)
  };
  return fetch(apiUrl + lightEndpoint, requestOptions).then(handleResponse);
}

// API export
export const api = {
  getLights,
  getEmptyLight,
  // getLightByName,
  addNewLight
};
