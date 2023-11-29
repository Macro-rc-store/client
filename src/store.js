import Vue from "vue";
import Vuex from "vuex";

import auth from "@/stores/auth";
import account from "@/stores/account";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    account
  }
});

export default store;