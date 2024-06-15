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
  async getCommentsByPostId(postId) {
    const request = {
      url: [this.getApiUrl(), postId].join("/"),
    };

    const response = await httpClient.get(request);
    return response.data;
  }
  async getRepliesByCommentId(commentId) {
    const request = {
      url: [this.getApiUrl(), commentId, "replies"].join("/"),
    };

    const response = await httpClient.get(request);
    return response.data;
  }
}

export default new CommentApi();
