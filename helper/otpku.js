const fetch = require("node-fetch");

class Otpku {
  constructor(apikey) {
    this.apikey = apikey;
  }
  async Request() {
    const request = fetch(
      `https://otpku.com/api/json.php?api_key=${this.apikey}&action=services&country=indo`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return request;
  }
  async GetNumber(id, operator) {
    const request = fetch(
      `https://otpku.com/api/json.php?api_key=${this.apikey}&action=order&service=${id}&operator=${operator}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return request;
  }
  async GetAction(OrderId, idaction) {
    const request = fetch(
      `https://otpku.com/api/json.php?api_key=${this.apikey}&action=set_status&id=${OrderId}&status=${idaction}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return request;
  }
  async GetMessage(OrderId) {
    const request = fetch(
      `https://otpku.com/api/json.php?api_key=${this.apikey}&action=status&id=${OrderId}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return request;
  }
}
module.exports = Otpku;
