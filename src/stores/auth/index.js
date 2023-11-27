import { SET_SESSION, REMOVE_SESSION } from "./types";

const SERVICE_ACCESS_TOKEN_KEY = 'access_token';
const SESSION_USERNAME = "username";

function decodeJwt(jwt) {
  const payloadBase64Url = jwt.split('.')[1];
  const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payloadJson = atob(payloadBase64);
  const payload = JSON.parse(payloadJson);
  return payload;
}

const state = {
  accessToken: localStorage.getItem(SERVICE_ACCESS_TOKEN_KEY) || undefined,
  username: localStorage.getItem(SESSION_USERNAME) || undefined
}

const mutations = {
  [SET_SESSION](state, accessToken) {
    let username = null;

    try {
      const payload = decodeJwt(accessToken);
      username = payload.username;
    } catch (error) {
      username = null;
    }

    state.accessToken = accessToken;
    state.username = username;

    localStorage.setItem(SERVICE_ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(SESSION_USERNAME, username)
  },

  [REMOVE_SESSION](state) {
    state.accessToken = undefined;
    state.username = undefined;
    localStorage.removeItem(SERVICE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(SESSION_USERNAME);
  }
}

import * as getters from "./getters";
import * as actions from "./actions";

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}