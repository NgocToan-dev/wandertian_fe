import httpClient from "../httpClient";
import BuApi from "./_buApi";

class BlogApi extends BuApi {
  controller = "blog";
  async searchPostByTag(tag) {
    const request = {
      url: [this.getApiUrl(), "tag", `${tag}`].join("/"),
    };

    const response = await httpClient.get(request);
    return response.data;
  }
  async searchPostByCategory(payload) {
    const request = {
      url: [this.getApiUrl(), "category"].join("/"),
      data: payload,
    };

    const response = await httpClient.post(request);
    return response.data;
  }
}

export default new BlogApi();
