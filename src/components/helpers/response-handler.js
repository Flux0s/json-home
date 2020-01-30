import { authenticationService } from "./auth-service"

export function handleResponse(response) {
  // console.log(response);
  return response.text().then((text) => {
    // console.log(text);
    let data
    data = text && JSON.parse(text)
    // console.log(data);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        authenticationService.logout()
        window.location.reload(true)
      }
      const error = (data && data) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
