import request from "./base";
const path = "/auth";

export default {
  profile: function () {
    return request().get("api/accounts/session");
  },

  login: function(params) {
    return request().post(path + "/login", params);
  },

  register: function(params) {
    return request().post(path + "/register", params);
  }
}