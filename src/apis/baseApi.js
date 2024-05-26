import httpConfig from "./httpConfig";
import axios from "axios";

class BaseApi {
  apiName = "";
  controller = "";

  async get() {
    const request = {
      url: this.getApiUrl(),
    };

    const response = await axios.get(request.url);
    return response.data;
  }

  getApiUrl() {
    return [httpConfig[this.apiName], this.controller].join("/");
  }
}

export default BaseApi;
