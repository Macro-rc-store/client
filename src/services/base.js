import axios from "axios";
import authStore from "@/stores/auth";

export default () => {
  const serviceUri = location.protocol + "//" + location.hostname + ":3000";
  const accessToken = authStore.state.accessToken;
  const headers = {};

  if (accessToken) {
    headers.Authorization = "Bearer " + accessToken;
  }

  return axios.create({
    baseURL: serviceUri,
    headers: headers,
  });
};
