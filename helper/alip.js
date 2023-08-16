const fetch = require("node-fetch");
class ALIP {
  constructor(username, lastname, email, password) {
    this.username = username;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
  async signUp(recapctha) {
    const res = fetch(
      "https://dashboard.branch.io/v1/callback/loggedout/signup",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "sec-ch-ua":
            '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-branch-dashboard": "dashboard",
          "x-client-redirect": "dashboard",
          "x-csrf-token": "EaBFiWwm-4RGsIzUfCr7qlTPz5GR3U16KpjY",
          "x-kl-ajax-request": "Ajax_Request",
          cookie:
            "_csrf=D5LI7GyA2sB8PHbuZCJ6jOGu; dash_oauth_state=67360b1000c2ccf1fb1af8ac82adaa99ff3d1decedfc9f7176; dashboard_external_referrer=",
          Referer: "https://dashboard.branch.io/",
          "Referrer-Policy": "origin-when-cross-origin",
        },
        body: JSON.stringify({
          name: this.username,
          last_name: this.lastname,
          email: this.email,
          password: this.password,
          password2: this.password,
          role: "Marketer",
          lowercase: true,
          capital: true,
          number: true,
          symbol: true,
          min: true,
          passwordMatch: true,
          passwordChecked: true,
          password2Checked: true,
          errorFootnotes: {
            name: "",
            last_name: "",
            email: "",
            password: "",
            password2: "",
            role: "",
            terms: "",
          },
          recaptcha_response: recapctha,
          timezone: "America/Los_Angeles",
          terms_consent_date: "2023-01-21T02:45:56",
          country: "Malaysia",
          initial_referrer: "",
          refId: "",
          bmp: "",
        }),
        method: "POST",
      }
    ).then((res) => res.json());
    return await res;
  }
}
module.exports = ALIP;
