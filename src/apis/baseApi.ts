import httpConfig from "./httpConfig";
import httpClient from "./httpClient";
import IBaseEntity from "@/interfaces/entity/IBaseEntity";

class BaseApi {
  apiName = "";
  controller = "";

  getApiUrl() {
    return [httpConfig[this.apiName], this.controller].join("/");
  }
  async getAll() {
    const request = {
      url: this.getApiUrl(),
    };

    const response = await httpClient.get(request);
    return response.data;
  }
  async getById(id: string) {
    const request = {
      url: [this.getApiUrl(), id].join("/"),
    };

    const response = await httpClient.get(request);
    return response.data;
  }
  async create(data: IBaseEntity) {
    const request = {
      url: [this.getApiUrl(), "add"].join("/"),
      data,
    };

    const response = await httpClient.post(request);
    return response.data;
  }

  async update(data: IBaseEntity) {
    const id = data._id;
    const saveData = { ...data };
    const request = {
      url: [this.getApiUrl(), id].join("/"),
      data: saveData,
    };

    const response = await httpClient.put(request);
    return response.data;
  }

  async load(payload) {
    const paging = {
      page: 0,
      limit: 10,
      filter: "",
      ...payload,
    };
    const request = {
      url: [this.getApiUrl(), "list"].join("/"),
      data: paging,
    };

    const response = await httpClient.post(request);
    return response.data;
  }

  async loadSummary(payload) {
    const request = {
      url: [this.getApiUrl(), "listSummary"].join("/"),
      data: payload,
    };

    const response = await httpClient.post(request);
    return response.data;
  }
  async delete(id) {
    const request = {
      url: [this.getApiUrl(), id].join("/"),
    };

    const response = await httpClient.delete(request);
    return response.data;
  }
  queryBuilder(payload) {
    if (payload) {
      return "?" + new URLSearchParams(payload).toString();
    }
    return "";
  }
}

export default BaseApi;
