const fetch = require("node-fetch");
var randomize = require("randomatic");
const Jimp = require("jimp");
const jsQR = require("jsqr");
const { HttpsProxyAgent } = require("https-proxy-agent");
const randomatic = require("randomatic");
const QRCode = require("qrcode");
class BLIBLI {
  constructor(UserId, Xsession, RequestId, Tokenid) {
    this.UserId = UserId;
    this.Xsession = Xsession;
    this.RequestId = RequestId;
    this.Tokenid = Tokenid;
  }
  async GenerateEmail() {
    const request = fetch("https://www.emailnator.com/generate-email", {
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrf-token":
          "eyJpdiI6IkN1d3o4U0xFV0M5QUE1c2ZsV2JGcWc9PSIsInZhbHVlIjoiY0hWN1Vtb2s2VkhrblRJMTlTWldKS1VYeW1iaTVQZ1Zmam51NzFxcGJpOHRSSlhkNGQ1bjVBM1BGVUl6Q3ZoZDJnYnVsSWczRUJGZFBKUXN1RnlnTXpLdGEzbkhZOGdEbmlPUkdoWFloNmU4eng3Q04rVnBXbzUwT0Y3V20wOUYiLCJtYWMiOiIwY2ViNTlkZTJkMjFiODQ1MjA4N2E0ZjZkYmQ3M2NlZGFiMjBhMTI4OTFmYWI5NDkyN2I4MWI0YTU1MTdhNDllIiwidGFnIjoiIn0=",
        cookie:
          "__gpi=UID=00000b915431d0c8:T=1671177723:RT=1671177723:S=ALNI_MZxTgcI99w-hlNxoA_zyCXfkd0itw; _ga=GA1.2.797940725.1671177723; _gid=GA1.2.500190654.1671177724; __gads=ID=835df3bf9b6b1655-221ffbdeecd8002b:T=1671177723:S=ALNI_MYUn3LK7ui6mqjpCVSMYetN3NTDgQ; _gat=1; cto_bundle=16n8MF9EUVRNdGJaSnVkV2R1a0lCQWwxT1hpcDZ6OVZ3U09lT1R4WEZLQTVZeThXVVgwc3JUcm1yQzhWMTh6eE95UmF6TEsyN0xxaiUyRlRpcnkzaTAwbGxxJTJCNVVKQjNva08lMkZJSzhFTmxOT0VTYjBiM1Y0OUpKb3h6TEZpeG1NWnFhR2ZIRmNtTm04eHJzNEpGSElzekZUSHVYZHclM0QlM0Q; XSRF-TOKEN=eyJpdiI6IkN1d3o4U0xFV0M5QUE1c2ZsV2JGcWc9PSIsInZhbHVlIjoiY0hWN1Vtb2s2VkhrblRJMTlTWldKS1VYeW1iaTVQZ1Zmam51NzFxcGJpOHRSSlhkNGQ1bjVBM1BGVUl6Q3ZoZDJnYnVsSWczRUJGZFBKUXN1RnlnTXpLdGEzbkhZOGdEbmlPUkdoWFloNmU4eng3Q04rVnBXbzUwT0Y3V20wOUYiLCJtYWMiOiIwY2ViNTlkZTJkMjFiODQ1MjA4N2E0ZjZkYmQ3M2NlZGFiMjBhMTI4OTFmYWI5NDkyN2I4MWI0YTU1MTdhNDllIiwidGFnIjoiIn0%3D; gmailnator_session=eyJpdiI6IjBPczlBVkVGbWZVOXlnUjJ4enEvN0E9PSIsInZhbHVlIjoiaVU3dUJZU0JTd21BZ05QQ0dXS1RnRnQwbEJtTDM2eFRXd1hVNnFpU2FzSWYrL2Z3RitlQnA5TytQYWRJSDBzV1JraWdUOU5ETmlHamVRVW1CQkxkd3RES0poVFJCSmppRVg1eFZ0MTFZdS9zbnhkc3pPeVBMWHhGVGJUTy9WYloiLCJtYWMiOiI1ZjI5NTNiYjUzYWNlM2I5MTJhNDljOGQ3YzZiNWJhZjZmNDc4YTI5ODEzYTEzNTE2OTE5ZjE2ODFjNjdiY2ZiIiwidGFnIjoiIn0%3D",
        Referer: "https://www.emailnator.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({ email: ["domain"] }),
      method: "POST",
    }).then((res) => res.json());
    return await request;
  }
  async GetEmail(email) {
    const request = fetch("https://www.emailnator.com/message-list", {
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrf-token":
          "eyJpdiI6Imtqd3dtc3RSa2tWdDNCSnNIZHZmalE9PSIsInZhbHVlIjoiZGdKSHRaRkNqMW1YVnNSajZyd2loanJ2U2dTODQ1YkJPOW5pMEQweVIvck1GZjNRc3BpSURTWmNqSVRkbDJkbHNiMVNCK1FNWURDWEQvTWd2UU10Um5MbFViZjM2M0ZwNm1mYzhLMFIra0RWNXROcFB3TW14aGl4NVcwUlI4RGkiLCJtYWMiOiI5ZmQ1YWEwZmIwNmEyNzY3ZmM2Zjc1ZmFiNjE0NTU3OGZjMTliNjljZTU0MGI1NjQwZDA5NjA0YmU5NmM4MTNhIiwidGFnIjoiIn0=",
        cookie:
          "__gpi=UID=00000b915431d0c8:T=1671177723:RT=1671177723:S=ALNI_MZxTgcI99w-hlNxoA_zyCXfkd0itw; _ga=GA1.2.797940725.1671177723; _gid=GA1.2.500190654.1671177724; __gads=ID=835df3bf9b6b1655-221ffbdeecd8002b:T=1671177723:S=ALNI_MYUn3LK7ui6mqjpCVSMYetN3NTDgQ; cto_bundle=NZHoll9EUVRNdGJaSnVkV2R1a0lCQWwxT1hsTDIzcnhlbkFJbXI0cGFOZlN3dE9kY3ZlJTJGQiUyQmdnTFJNQ3dQcGFWRlVoU1ZmOElCZTFZMlZwNkNGQ0IlMkJQdzY3RGFuejJPdUZxQjRVazhVWWNJSXgyWkEyNFVkV3pUb3hUVk8lMkZKYjVTeCUyQmZqTWdtRVdEJTJCd014UmNVbk45cnN6cGclM0QlM0Q; _gat=1; XSRF-TOKEN=eyJpdiI6Imtqd3dtc3RSa2tWdDNCSnNIZHZmalE9PSIsInZhbHVlIjoiZGdKSHRaRkNqMW1YVnNSajZyd2loanJ2U2dTODQ1YkJPOW5pMEQweVIvck1GZjNRc3BpSURTWmNqSVRkbDJkbHNiMVNCK1FNWURDWEQvTWd2UU10Um5MbFViZjM2M0ZwNm1mYzhLMFIra0RWNXROcFB3TW14aGl4NVcwUlI4RGkiLCJtYWMiOiI5ZmQ1YWEwZmIwNmEyNzY3ZmM2Zjc1ZmFiNjE0NTU3OGZjMTliNjljZTU0MGI1NjQwZDA5NjA0YmU5NmM4MTNhIiwidGFnIjoiIn0%3D; gmailnator_session=eyJpdiI6Ii80a0pQaVAxQkgrRU9GVXJnMlQ1TkE9PSIsInZhbHVlIjoiTVlRMG1KYmRoV0hKWUU3cUsvQXc0N1dPcE5Kdk9JWkYvRVlGcEphaE91bnpXU3VxVkI4Y3lZUG82a3dMKzF0MDg5eWlSTEJXMzN0TjZaODErZmxNUDZhY1p2ZEJGVHVzZFpLZHdRRnExR0xlOFAwbmxES1FlaGoxQm84aDhXWUoiLCJtYWMiOiIwNzM3YzhjYTFmODIxNDBjNjQzMjA2MmI4YzVhNDcwNTg5YmEwZmY0OTQ4MzRkNTUzNmYyN2E4MDIwNjc1MTllIiwidGFnIjoiIn0%3D",
        Referer: "https://www.emailnator.com/inbox/anjay993248@smartnator.com",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },

      body: JSON.stringify({ email: email }),
      method: "POST",
    }).then((res) => res.json());
    return await request;
  }
  async RegisterRequestOTP(email, pass, nama) {
    const request = fetch("https://www.blibli.com/backend/mobile/reg/v2", {
      method: "POST",
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        Host: "www.blibli.com",
        // "@": "ignore-auth",
        "X-Acf-Sensor-Data":
          "1,a,I7+0U/JpvCI1p/gsCl0AIMOeL5FkSY8T84EL/3zx0qHa9Le6Xw3DqBHGKH9IlWW47arqYoElJxxILL93Ckdgi5cvlA+eThP2S94UgOQJzb1s9MHa3hizdcBYQ1eqj7K2BIDtub28GMicaA8EVlez+ZQ6r1BcHo7TStLBMN0GevQ=,SYw+9qGTWozfhd0iGo1U1VFNc7Fza8uDbOlINkqCd7OD11j+puBtyrG//XQe2iJO1FXn+ahOg7mTdnurEDS4ga4VUdKzNrSeCx+yrT9jO41aOZEo/ea9uaIjpwtMmPwi1ytVjISxkbeZ1jmRyHx86lbmD2cZaBqc/lCaeKGde8k=$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$0,2000,0",
        Dvid: "DT_" + this.Tokenid,
        Accept: "application/json",
        "X-Userid": this.UserId,
        "X-Sessionid": this.Xsession,
        "X-Requestid": this.RequestId,
        "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
        "Accept-Language": "id",
        "Build-No": "4000",
        Channelid: "android",
        Storeid: "10001",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      agent: new HttpsProxyAgent(
        `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
          (1000000 * Math.random()) | 0
        }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
      ),

      body: `username=${email}&password=${pass}&fullName=${nama}&securityQuestions=%5B%5D`,
    }).then((res) => res.json());
    return await request;
  }
  async CekAccount(email, pass) {
    const request = fetch("https://account.blibli.com/gdn-oauth/token", {
      method: "POST",
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        Host: "account.blibli.com",
        "@": "ignore-auth",
        "X-Acf-Sensor-Data":
          "1,a,I7+0U/JpvCI1p/gsCl0AIMOeL5FkSY8T84EL/3zx0qHa9Le6Xw3DqBHGKH9IlWW47arqYoElJxxILL93Ckdgi5cvlA+eThP2S94UgOQJzb1s9MHa3hizdcBYQ1eqj7K2BIDtub28GMicaA8EVlez+ZQ6r1BcHo7TStLBMN0GevQ=,SYw+9qGTWozfhd0iGo1U1VFNc7Fza8uDbOlINkqCd7OD11j+puBtyrG//XQe2iJO1FXn+ahOg7mTdnurEDS4ga4VUdKzNrSeCx+yrT9jO41aOZEo/ea9uaIjpwtMmPwi1ytVjISxkbeZ1jmRyHx86lbmD2cZaBqc/lCaeKGde8k=$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$0,2000,0",
        Dvid: "DT_" + this.Tokenid,
        Accept: "application/json",
        "X-Userid": this.UserId,
        "X-Sessionid": this.Xsession,
        "X-Requestid": this.RequestId,
        "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
        "Accept-Language": "id",
        "Build-No": "4000",
        Channelid: "android",
        Storeid: "10001",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      agent: new HttpsProxyAgent(
        `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
          (1000000 * Math.random()) | 0
        }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
      ),

      body: `grant_type=password&username=${email}&password=${pass}&client_id=86ad3acb-9ac8-419a-9446-a5828f80137e&client_secret=q%2BSPZG94E%3DgN%2BZba`,
    }).then((res) => res.json());
    return await request;
  }
  async RequestOTP(token) {
    const request = fetch(
      "https://www.blibli.com/backend/common/users/_request-challenge-code",
      {
        method: "POST",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),

        body: JSON.stringify({
          challenge: { token: token },
          type: "EMAIL",
        }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async Login(email, pass) {
    const request = fetch("https://account.blibli.com/gdn-oauth/token", {
      method: "POST",
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        Host: "account.blibli.com",
        "X-Acf-Sensor-Data":
          "X-Acf-Sensor-Data: 1,a,I7+0U/JpvCI1p/gsCl0AIMOeL5FkSY8T84EL/3zx0qHa9Le6Xw3DqBHGKH9IlWW47arqYoElJxxILL93Ckdgi5cvlA+eThP2S94UgOQJzb1s9MHa3hizdcBYQ1eqj7K2BIDtub28GMicaA8EVlez+ZQ6r1BcHo7TStLBMN0GevQ=,SYw+9qGTWozfhd0iGo1U1VFNc7Fza8uDbOlINkqCd7OD11j+puBtyrG//XQe2iJO1FXn+ahOg7mTdnurEDS4ga4VUdKzNrSeCx+yrT9jO41aOZEo/ea9uaIjpwtMmPwi1ytVjISxkbeZ1jmRyHx86lbmD2cZaBqc/lCaeKGde8k=$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$0,2000,0",
        Dvid: "DT_" + this.Tokenid,
        Accept: "application/json",
        "X-Userid": this.UserId,
        "X-Sessionid": this.Xsession,
        "X-Requestid": this.RequestId,
        "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
        "Accept-Language": "id",
        "Build-No": "4000",
        Channelid: "android",
        Storeid: "10001",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      agent: new HttpsProxyAgent(
        `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
          (1000000 * Math.random()) | 0
        }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
      ),

      body: `grant_type=password&username=${encodeURIComponent(
        email
      )}&password=${pass}&client_id=86ad3acb-9ac8-419a-9446-a5828f80137e&client_secret=q%2BSPZG94E%3DgN%2BZba`,
    }).then((res) => res.json());
    return await request;
  }
  async RegisLogin(email, code, token) {
    const request = fetch("https://account.blibli.com/gdn-oauth/token", {
      method: "POST",
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        Host: "account.blibli.com",
        "X-Acf-Sensor-Data":
          " 1,a,I7+0U/JpvCI1p/gsCl0AIMOeL5FkSY8T84EL/3zx0qHa9Le6Xw3DqBHGKH9IlWW47arqYoElJxxILL93Ckdgi5cvlA+eThP2S94UgOQJzb1s9MHa3hizdcBYQ1eqj7K2BIDtub28GMicaA8EVlez+ZQ6r1BcHo7TStLBMN0GevQ=,SYw+9qGTWozfhd0iGo1U1VFNc7Fza8uDbOlINkqCd7OD11j+puBtyrG//XQe2iJO1FXn+ahOg7mTdnurEDS4ga4VUdKzNrSeCx+yrT9jO41aOZEo/ea9uaIjpwtMmPwi1ytVjISxkbeZ1jmRyHx86lbmD2cZaBqc/lCaeKGde8k=$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$0,2000,0",
        Dvid: "DT_" + this.Tokenid,
        Accept: "application/json",
        "X-Userid": this.UserId,
        "X-Sessionid": this.Xsession,
        "X-Requestid": this.RequestId,
        "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
        "Accept-Language": "id",
        "Build-No": "4000",
        Channelid: "android",
        Storeid: "10001",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      agent: new HttpsProxyAgent(
        `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
          (1000000 * Math.random()) | 0
        }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
      ),

      body: `challenge_token=${token}&grant_type=mfa_otp&challenge_code=${code}&client_secret=q%2BSPZG94E%3DgN%2BZba&client_id=86ad3acb-9ac8-419a-9446-a5828f80137e&username=${email}`,
    }).then((res) => res.json());
    return await request;
  }
  async CeckStatusAccount(token) {
    const request = fetch("https://www.blibli.com/backend/common/users", {
      method: "GET",
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        Host: "www.blibli.com",
        Accept: "application/json",
        "X-Userid": this.UserId,
        "X-Sessionid": this.Xsession,
        "X-Requestid": this.RequestId,
        "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
        "Accept-Language": "id",
        "Build-No": "4000",
        Channelid: "android",
        Storeid: "10001",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `bearer ${token}`,
      },
      agent: new HttpsProxyAgent(
        `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
          (1000000 * Math.random()) | 0
        }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
      ),
    }).then((res) => res.json());
    return await request;
  }
  async AddNumber(token, number) {
    const request = fetch(
      "https://www.blibli.com/backend/mobile/phone-number-verification/token?phoneNumber=" +
        number,
      {
        method: "GET",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
      }
    ).then((res) => res.json());
    return await request;
  }
  async VerifyOtpNumber(token, otp) {
    const request = fetch(
      "https://www.blibli.com/backend/mobile/phone-number-verification/verify-token",
      {
        method: "POST",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),

        body: JSON.stringify({ token: otp }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async AddPin(token, pin) {
    const request = fetch("https://www.blibli.com/backend/wallet/pin", {
      method: "POST",
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        Host: "www.blibli.com",
        Accept: "application/json",
        "X-Userid": this.UserId,
        "X-Sessionid": this.Xsession,
        "X-Requestid": this.RequestId,
        "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
        "Accept-Language": "id",
        "Build-No": "4000",
        Channelid: "android",
        Storeid: "10001",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `bearer ${token}`,
      },
      agent: new HttpsProxyAgent(
        `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
          (1000000 * Math.random()) | 0
        }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
      ),

      body: JSON.stringify({ pin: pin }),
    }).then((res) => res.json());
    return await request;
  }
  async RequestOtpPin(token) {
    const request = fetch(
      "https://www.blibli.com/backend/wallet/pin/_request",
      {
        method: "POST",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),

        body: "",
      }
    ).then((res) => res.json());
    return await request;
  }
  async VerifyOtpPin(token, otp) {
    const request = fetch("https://www.blibli.com/backend/wallet/pin/_verify", {
      method: "POST",
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        Host: "www.blibli.com",
        Accept: "application/json",
        "X-Userid": this.UserId,
        "X-Sessionid": this.Xsession,
        "X-Requestid": this.RequestId,
        "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
        "Accept-Language": "id",
        "Build-No": "4000",
        Channelid: "android",
        Storeid: "10001",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `bearer ${token}`,
      },
      agent: new HttpsProxyAgent(
        `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
          (1000000 * Math.random()) | 0
        }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
      ),

      body: JSON.stringify({ verificationCode: otp }),
    }).then((res) => res.json());
    return await request;
  }
  async CekVoucher(token) {
    const request = fetch(
      "https://www.blibli.com/backend/member-voucher/vouchers?origin=BLIBLI",
      {
        method: "GET",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
      }
    ).then((res) => res.json());
    return await request;
  }
  async DeleteCartDigital(token) {
    const request = fetch(
      "https://www.blibli.com/backend/digital-product/carts",
      {
        method: "DELETE",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
      }
    ).then((res) => res.json());
    return await request;
  }
  async AddBirthday(token, name, email, birthday) {
    const request = fetch("https://www.blibli.com/backend/member/profile", {
      method: "POST",
      headers: {
        "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
          "0",
          3
        )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
        Host: "www.blibli.com",
        Accept: "application/json",
        "X-Userid": this.UserId,
        "X-Sessionid": this.Xsession,
        "X-Requestid": this.RequestId,
        "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
        "Accept-Language": "id",
        "Build-No": "4000",
        Channelid: "android",
        Storeid: "10001",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `bearer ${token}`,
      },
      agent: new HttpsProxyAgent(
        `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
          (1000000 * Math.random()) | 0
        }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
      ),

      body: JSON.stringify({
        name: name,
        birthDate: "2000-02-21",
        gender: "M",
        email: email,
        notification: "SMS",
        token: "",
      }),
    }).then((res) => res.json());
    return await request;
  }
  async InputIdPaper(token, idpaper) {
    const request = fetch(
      "https://www.blibli.com/backend/digital-product/carts/_customer-number",
      {
        method: "POSt",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
        body: JSON.stringify({
          customerNumber: idpaper,
          operatorName: "Paper id",
          productType: "INVOICING",
        }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async CekCartDigital(token) {
    const request = fetch(
      "https://www.blibli.com/backend/digital-product/carts",
      {
        method: "GET",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
      }
    ).then((res) => res.json());
    return await request;
  }
  async CekTokenList(token) {
    const request = fetch(
      "https://www.blibli.com/backend/digital-product/products?productType=ELECTRICITY_CREDIT&operatorName=PLN",
      {
        method: "GET",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
      }
    ).then((res) => res.json());
    return await request;
  }
  async PayToken(token, customerNumber, itemSku, nominal) {
    const request = fetch(
      "https://www.blibli.com/backend/digital-product/carts/_customer-number",
      {
        method: "POST",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
        body: JSON.stringify({
          customerNumber: customerNumber,
          productType: "ELECTRICITY_CREDIT",
          operatorName: "",
          itemSku: itemSku,
          nominal: nominal,
          autoPayType: "MONTHLY",
          productAdjustmentValue: 0,
          flashSalePPASku: false,
        }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async CekUserTokenCustomer(token) {
    const request = fetch(
      "https://www.blibli.com/backend/digital-product/carts/_customer-number-inquiry",
      {
        method: "POST",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
        body: JSON.stringify({
          customerNumber: "32149404256",
          productType: "PLN_PREPAID",
        }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async PaymentDigitalJenius(token) {
    const request = fetch(
      "https://www.blibli.com/backend/digital-product/carts/_payment",
      {
        method: "PUT",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
        body: JSON.stringify({ paymentMethod: "JeniusCashtag" }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async PaymentDigitalQris(token) {
    const request = fetch(
      "https://www.blibli.com/backend/digital-product/carts/_payment",
      {
        method: "PUT",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
        body: JSON.stringify({ paymentMethod: "VeritransQRIS" }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async PaymentWallet(token) {
    const request = fetch(
      "https://www.blibli.com/backend/digital-product/carts/_payment",
      {
        method: "PUT",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
        body: JSON.stringify({ paymentMethod: "Wallet" }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async ApplydVoucher(token, voc) {
    const request = fetch(
      "https://www.blibli.com/backend/digital-product/coupons/_apply",
      {
        method: "POST",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
        body: JSON.stringify({ id: voc }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async PaymentFinalQRIS(token) {
    const request = fetch(
      "https://www.blibli.com/backend/digital-product/orders",
      {
        method: "POST",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
        body: JSON.stringify({ extendedData: { PAYMENT_ACTION: "NORMAL" } }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async PaymentWalletPin(token, idpesanan, pin) {
    const request = fetch(
      "https://www.blibli.com/backend/wallet/purchase/_verify",
      {
        method: "POST",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
        body: JSON.stringify({
          pin: pin,
          orderId: idpesanan,
          cartType: "digital",
        }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async PaymentFinal(token) {
    const request = fetch(
      "https://www.blibli.com/backend/digital-product/orders",
      {
        method: "POST",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
        body: JSON.stringify({
          extendedData: {
            JENIUS_CASHTAG: "$roygans",
            PAYMENT_ACTION: "NORMAL",
          },
        }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async CekStatusPesanan(token, idlastpesanan) {
    const request = fetch(
      `https://www.blibli.com/backend/digital/order-history/search?query=${idlastpesanan}&orderStatusType=&page=0&size=10`,
      {
        method: "GET",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
      }
    ).then((res) => res.json());
    return await request;
  }
  async Shake(token, idshake) {
    const request = fetch(
      `https://www.blibli.com/backend/game/play/${idshake}`,
      {
        method: "POST",
        headers: {
          "X-Forwarded-For": `${""}${randomize("0", 3)}${"."}${randomize(
            "0",
            3
          )}${"."}${randomize("0", 3)}${"."}${randomize("0", 3)}${""}`,
          Host: "www.blibli.com",
          Accept: "application/json",
          "X-Userid": this.UserId,
          "X-Sessionid": this.Xsession,
          "X-Requestid": this.RequestId,
          "User-Agent": `BlibliAndroid/8.6.0(4000) ${this.UserId} Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 10 MIUI/V12.0.2.0.QCOIDXM)`,
          "Accept-Language": "id",
          "Build-No": "4000",
          Channelid: "android",
          Storeid: "10001",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
        agent: new HttpsProxyAgent(
          `http://brd-customer-hl_7da2a2da-zone-zone6-country-id-session-${
            (1000000 * Math.random()) | 0
          }:5omkljmze92i@zproxy.lum-superproxy.io:22225`
        ),
        // body: JSON.stringify({ playId: "" }),
        body: JSON.stringify({
          score: 50,
          playId: "fb4057e5-0754-1c9b-e7fa-9ce7acc77341",
        }),
      }
    ).then((res) => res.json());
    return await request;
  }
  async renderQrCode(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Host: "api.midtrans.co.id",
        },
      });

      const image = await Jimp.read(await response.buffer());

      const qrCodeImageArray = new Uint8ClampedArray(image.bitmap.data.buffer);

      const code = jsQR(
        qrCodeImageArray,
        image.bitmap.width,
        image.bitmap.height
      );

      QRCode.toString(
        code.data,
        { type: "terminal", width: 10, errorCorrectionLevel: "L", small: true },
        function (err, url) {
          console.log(url);
        }
      );
    } catch (error) {}
  }
}
module.exports = BLIBLI;
