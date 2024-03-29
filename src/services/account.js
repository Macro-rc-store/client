import request from "./base";
const path = "api/accounts";

export default {
  changePassword: function(params) {
    return request().post(path + "/change-password", params);
  },
  getInfo: function() {
    return request().get(path + "/get-info");
  }
}