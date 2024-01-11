import { SET_SESSION, REMOVE_SESSION } from "./types";

const SERVICE_ACCESS_TOKEN_KEY = 'access_token';
const SESSION_USER = "userInfo";

function decodeJwt(jwt) {
  const payloadBase64Url = jwt.split('.')[1];
  const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payloadJson = atob(payloadBase64);
  const payload = JSON.parse(payloadJson);
  return payload;
}

function getUser() {
  const accessToken = localStorage.getItem(SERVICE_ACCESS_TOKEN_KEY);

  if(!accessToken) {
    return;
  }

  try {
    const payload = decodeJwt(accessToken);
    const userInfo = {
      name: payload.username,
      email: payload.email,
      role: payload.role
    }
    localStorage.setItem(SESSION_USER, JSON.stringify(userInfo));
    return payload.username;
  } catch (error) {
    return;
  }
}

function getRole() {
  const accessToken = localStorage.getItem(SERVICE_ACCESS_TOKEN_KEY);

  if(!accessToken) {
    return;
  }

  try {
    const payload = decodeJwt(accessToken);
    return payload.role;
  } catch (error) {
    return;
  }
}

const state = {
  accessToken: localStorage.getItem(SERVICE_ACCESS_TOKEN_KEY) || undefined,
  username: getUser() || undefined,
  role: getRole() || undefined
}

const mutations = {
  [SET_SESSION](state, accessToken) {
    let username = null;
    let role = null;

    try {
      const payload = decodeJwt(accessToken);
      username = payload.username;
      role = payload.role;
    } catch (error) {
      username = null;
      role = null;
    }

    state.accessToken = accessToken;
    state.username = username;
    state.role = role;
    
    localStorage.setItem(SERVICE_ACCESS_TOKEN_KEY, accessToken);
  },

  [REMOVE_SESSION](state) {
    state.accessToken = undefined;
    state.username = undefined;
    state.role = undefined;
    localStorage.removeItem(SERVICE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(SESSION_USER);
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