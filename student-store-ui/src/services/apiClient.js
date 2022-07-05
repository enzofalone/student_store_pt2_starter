import axios from "axios";
import { relativeTimeThreshold } from "moment";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    // url we are going to use in order to make a request
    const url = `${this.remoteHostUrl}/${endpoint}`;
    //set default header parameter
    const headers = {
      Content_Type: "application/json",
    };
    //if there is a token append it to header
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  async loginUser(credentials) {
    return await this.request({
      endpoint: "auth/login/",
      method: "POST",
      data: credentials
    });
  }

  async registerUser(credentials) {
    return await this.request({
      endpoint: "auth/register/",
      method: "POST",
      data: credentials
    })
  }
}

export default new ApiClient(
  process.env.REACT_APP_REMOHE_HOST_URL || "http://localhost:3001"
);
