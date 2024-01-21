import axios from "axios";

export default () => {
  const serviceUri = location.protocol + "//" + location.hostname + ":3000";
  const accessToken = localStorage.getItem('access_token') || undefined;
  const headers = {};

  if (accessToken) {
    headers.Authorization = "Bearer " + accessToken;
  }

  return axios.create({
    baseURL: serviceUri,
    headers: headers,
  });
};
