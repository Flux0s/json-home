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
// TODO: This function has buisness logic in it and should be extracted elsewhere
function getEmptyLight() {
  return getLightSchema().then((res) => {
    // console.log(res);
    let emptyLight = {};
    for (var field in res) emptyLight[field] = "";
    return emptyLight;
  });
}
function getLightSchema() {
  const requestOptions = {
    method: "GET",
    headers: baseHeadersObject(authenticationService.currentUserValue.token)
  };
  return fetch(apiUrl + lightEndpoint + "?schema=true", requestOptions).then(
    handleResponse
  );
}
function addNewLight(light) {
  const requestOptions = {
    method: "PUT",
    headers: baseHeadersObject(authenticationService.currentUserValue.token),
    body: JSON.stringify(light)
  };
  return fetch(apiUrl + lightEndpoint, requestOptions).then(handleResponse);
}
function updateExistingLight(light) {
  const requestOptions = {
    method: "POST",
    headers: baseHeadersObject(authenticationService.currentUserValue.token),
    body: JSON.stringify(light)
  };
  return fetch(apiUrl + lightEndpoint + "/" + light._id, requestOptions).then(
    handleResponse
  );
}

function deleteExistingLight(id) {
  const requestOptions = {
    method: "DELETE",
    headers: baseHeadersObject(authenticationService.currentUserValue.token)
  };
  return fetch(apiUrl + lightEndpoint + "/" + id, requestOptions).then(
    handleResponse
  );
}

// API export
export const api = {
  getLights,
  getEmptyLight,
  getLightSchema,
  addNewLight,
  updateExistingLight,
  deleteExistingLight
};
