import httpClient from "../httpClient";
import BuApi from "./_buApi";

class CommentApi extends BuApi {
  controller = "comment";
  async saveComment(payload) {
    const request = {
      url: [this.getApiUrl(), "save"].join("/"),
      data: payload,
    };
    return await httpClient.post(request);
  }
}

export default new CommentApi();
