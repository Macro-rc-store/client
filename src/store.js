import Vue from "vue";
import Vuex from "vuex";

import serviceActuator from "@/stores/service-actuator";
import auth from "@/stores/auth";
import account from "@/stores/account";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    serviceActuator,
    auth,
    account
  }
});

export default store;