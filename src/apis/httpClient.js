import axios from "axios";
import commonFn from "@/utilities/commonFn";

class HttpClient {
  constructor() {
    this.mask = null;
  }
  async get(request) {
    const response = await axios.get(request.url);
    return response;
  }
  async post(request) {
    const response = await axios.post(request.url, request.data);
    return response;
  }
  async put(request) {
    const response = await axios.put(request.url, request.data);
    return response;
  }
  async delete(request) {
    const response = await axios.delete(request.url);
    return response;
  }
}
export default new HttpClient();
