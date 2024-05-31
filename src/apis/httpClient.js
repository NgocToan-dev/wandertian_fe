import axios from "axios";
import commonFn from "@/utilities/commonFn";

class HttpClient {
  async get(request) {
    let mask = commonFn.showMask();
    try {
      const response = await axios.get(request.url);
      return response;
    } finally {
      commonFn.hideMask(mask);
    }
  }
  async post(request) {
    let mask = commonFn.showMask();
    try {
      const response = await axios.post(request.url, request.data);
      return response;
    } finally {
      commonFn.hideMask(mask);
    }
  }
  async put(request) {
    let mask = commonFn.showMask();
    try {
      const response = await axios.put(request.url, request.data);
      return response;
    } finally {
      commonFn.hideMask(mask);
    }
  }
  async delete(request) {
    let mask = commonFn.showMask();
    try {
      const response = await axios.delete(request.url);
      return response;
    } finally {
      commonFn.hideMask(mask);
    }
  }
}
export default new HttpClient();
