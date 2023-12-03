import request from "./base";
const path = "/management";

export default {
  getMetrics: function () {
    return request().get(path + "/metrics");
  },
};
