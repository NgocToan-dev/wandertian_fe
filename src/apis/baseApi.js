import httpConfig from "./httpConfig";
import axios from "axios";

class BaseApi {
  apiName = "";
  controller = "";

  getApiUrl() {
    return [httpConfig[this.apiName], this.controller].join("/");
  }
  async get() {
    const request = {
      url: this.getApiUrl(),
    };

    const response = await axios.get(request.url);
    return response.data;
  }
  async getById(id) {
    const request = {
      url: [this.getApiUrl(), id].join("/"),
    };

    const response = await axios.get(request.url);
    return response.data;
  }

  async update(id, data) {
    const request = {
      url: [this.getApiUrl(), id].join("/"),
      data,
    };

    const response = await axios.put(request.url, request.data);
    return response.data;
  }
}

export default BaseApi;
