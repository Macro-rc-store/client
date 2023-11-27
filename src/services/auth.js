import request from "./base";
const path = "/auth";

export default {
  login: function(params) {
    return request().post(path + "/login", params);
  }
}