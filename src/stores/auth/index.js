import { SET_SESSION, REMOVE_SESSION } from "./types";

const SESSION_USERNAME = "username";

const state = {
  username: localStorage.getItem(SESSION_USERNAME) || undefined
}

const mutations = {
  [SET_SESSION](state, username) {
    state.username = username;
    localStorage.setItem(SESSION_USERNAME, username)
  },

  [REMOVE_SESSION](state) {
    state.username = undefined;
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