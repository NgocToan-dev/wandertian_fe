import httpClient from "../httpClient";
import SysApi from "./_sysApi";

class UserApi extends SysApi {
  controller = "user";

  async checkLogin(data) {
    const request = {
      url: [this.getApiUrl(), "checkLogin"].join("/"),
      data: data,
    };
    return await httpClient.post(request);
  }
}

export default new UserApi();
