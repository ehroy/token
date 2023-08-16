const blibli = require("./helper/blibli");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");
const readline = require("readline-sync");
const fs = require("fs-extra");
const delay = require("delay");
const chalk = require("chalk");
const QRCode = require("qrcode");
const imaps = require("imap-simple");
const { convert } = require("html-to-text");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process", // <- this one doesn't works in Windows
      "--disable-gpu",
    ],
  },
  authStrategy: new LocalAuth(),
});
const randstring = (length) =>
  new Promise((resolve, reject) => {
    var text = "";
    var possible = "1234567890";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    resolve(text);
  });
const randstr = (length) =>
  new Promise((resolve, reject) => {
    var text = "";
    var possible = "1234567890";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    resolve(text);
  });
const genUniqueId = (length) =>
  new Promise((resolve, reject) => {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz1234567890";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    resolve(text);
  });
const QR = (sessionId, jwt, userId, uniqueId, qrresult) =>
  new Promise((resolve, reject) => {
    // console.log(otp, sessionId, jwt, userId, uniqueId);
    fetch(`https://customer.gopayapi.com/v1/explore`, {
      method: "POST",
      headers: {
        "X-Session-ID": sessionId,
        D1: "17:AC:A3:A5:AD:0B:5E:27:A1:A1:42:32:FF:CF:15:CB:2C:11:C6:8C:BB:8E:6B:BB:F2:70:DA:EE:38:47:BE:60",
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Platform": "Android",
        "X-UniqueId": uniqueId,
        "X-AppVersion": "4.48.1",
        "X-AppId": "com.gojek.app",
        "X-DeviceOS": "Android,7.0",
        "X-User-Type": "customer",
        "X-PhoneMake": "unknown",
        "X-DeviceToken": "",
        "X-PushTokenType": "FCM",
        "X-PhoneModel": "Android,xiaomi redmi note 7",
        "User-uuid": userId,
        Authorization: `Bearer ${jwt}`,
        "Accept-Language": "en-ID",
        "X-User-Locale": "en_ID",
        "X-Location": "65.9667,-18." + randstring(4),
        "X-Location-Accuracy": "0.0",
        "Gojek-Country-Code": "ID",
        "X-M1":
          '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:"WiredSSID",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631627063',
        "Content-Type": "application/json; charset=UTF-8",
        "Content-Length": "2228",
        Host: "customer.gopayapi.com",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip",
        "User-Agent": "okhttp/3.12.13",
      },
      body: JSON.stringify({
        data: qrresult,
        type: "QR_CODE",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
const GetdataAccount = (token, uniqueId, sessionId) =>
  new Promise((resolve, reject) => {
    fetch("https://api.gojekapi.com/gojek/v2/customer", {
      method: "GET",
      headers: {
        "X-AppVersion": "4.48.1",
        "X-AppId": "com.gojek.app",
        "X-Platform": "Android",
        "X-UniqueId": uniqueId,
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Session-ID": sessionId,
        D1: "17:AC:A3:A5:AD:0B:5E:27:A1:A1:42:32:FF:CF:15:CB:2C:11:C6:8C:BB:8E:6B:BB:F2:70:DA:EE:38:47:BE:60",
        "X-DeviceOS": "Android,7.0",
        "X-User-Type": "customer",
        "X-PhoneMake": "unknown",
        "X-DeviceToken": "",
        "X-PhoneModel": "Android,xiaomi redmi note 7",
        "X-PushTokenType": "FCM",
        "User-uuid": "",
        Authorization: `Bearer ${token}`,
        "Accept-Language": "en-ID",
        "X-User-Locale": "en_ID",
        "X-Location": "65.9667,-18." + randstring(4),
        "X-Location-Accuracy": "10.0",
        "Gojek-Country-Code": "ID",
        "Gojek-Service-Area": "58",
        "Gojek-Timezone": "Asia/Jakarta",
        "X-M1":
          '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:"WiredSSID",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631627063',
        Host: "api.gojekapi.com",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip",
        "User-Agent": "okhttp/3.12.13",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
const balance = (sessionId, jwt, userId, uniqueId) =>
  new Promise((resolve, reject) => {
    // console.log(otp, sessionId, jwt, userId, uniqueId);
    fetch("https://customer.gopayapi.com/v1/payment-options/balances", {
      method: "GET",
      headers: {
        "X-Session-ID": sessionId,
        D1: "17:AC:A3:A5:AD:0B:5E:27:A1:A1:42:32:FF:CF:15:CB:2C:11:C6:8C:BB:8E:6B:BB:F2:70:DA:EE:38:47:BE:60",
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Platform": "Android",
        "X-UniqueId": uniqueId,
        "X-AppVersion": "4.48.1",
        "X-AppId": "com.gojek.app",
        "X-DeviceOS": "Android,7.0",
        "X-User-Type": "customer",
        "X-PhoneMake": "Samsung",
        "X-DeviceToken": "",
        "X-PushTokenType": "FCM",
        "X-PhoneModel": "Android,xiaomi redmi note 7",

        "User-uuid": userId,
        Authorization: `Bearer ${jwt}`,
        "Accept-Language": "en-ID",
        "X-User-Locale": "en_ID",
        "X-Location": "65.9667,-18." + randstring(4),
        "X-Location-Accuracy": "0.0",
        "Gojek-Country-Code": "ID",
        "X-M1":
          '1:UNKNOWN,2:UNKNOWN,3:1634552877872-4410887987191940410,4:15193,5:gmin|2400|4,6:10:D0:FF:51:13:26,7:"cnqwjfk403",8:720x1280,9:passive,gps,network,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2001,14:1644586815',
        Host: "customer.gopayapi.com",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip",
        "User-Agent": "okhttp/3.12.13",
        "If-Modified-Since": "Fri, 11 Feb 2022 13:40:11 GMT",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
const Paycok = (sessionId, jwt, userId, uniqueId, idtrx, boday) =>
  new Promise((resolve, reject) => {
    // console.log(otp, sessionId, jwt, userId, uniqueId);
    fetch(`https://customer.gopayapi.com/v2/payments/${idtrx}/capture`, {
      method: "PATCH",
      headers: {
        pin: "",
        D1: "17:AC:A3:A5:AD:0B:5E:27:A1:A1:42:32:FF:CF:15:CB:2C:11:C6:8C:BB:8E:6B:BB:F2:70:DA:EE:38:47:BE:60",
        Accept: "application/json",
        "X-Platform": "Android",
        "X-UniqueId": uniqueId,
        "X-Session-ID": sessionId,
        "X-AppVersion": "4.48.1",
        "X-AppId": "com.gojek.app",
        "X-DeviceOS": "Android,7.0",
        "X-User-Type": "customer",
        "X-PhoneMake": "unknown",
        "X-DeviceToken": "",
        "X-PushTokenType": "FCM",
        "X-PhoneModel": "Android,xiaomi redmi note 7",
        "User-uuid": userId,
        Authorization: `Bearer ${jwt}`,
        "Accept-Language": "en-ID",
        "X-User-Locale": "en_ID",
        "X-Location": "65.9667,-18." + randstring(4),
        "X-Location-Accuracy": "0.0",
        "Gojek-Country-Code": "ID",
        "X-M1":
          '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:"WiredSSID",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631627063',
        "Content-Type": "application/json; charset=UTF-8",
        "Content-Length": "2236",
        Host: "customer.gopayapi.com",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip",
        "User-Agent": "okhttp/3.12.13",
      },
      body: JSON.stringify(boday),
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
const Paycok2 = (sessionId, jwt, userId, uniqueId, idtrx, boday) =>
  new Promise((resolve, reject) => {
    // console.log(otp, sessionId, jwt, userId, uniqueId);
    fetch(`https://customer.gopayapi.com/v3/payments/${idtrx}/capture`, {
      method: "PATCH",
      headers: {
        pin: 112233,
        D1: "17:AC:A3:A5:AD:0B:5E:27:A1:A1:42:32:FF:CF:15:CB:2C:11:C6:8C:BB:8E:6B:BB:F2:70:DA:EE:38:47:BE:60",
        Accept: "application/json",
        "X-Session-ID": sessionId,
        "X-Platform": "Android",
        "X-UniqueId": uniqueId,
        "X-AppVersion": "4.48.1",
        "X-AppId": "com.gojek.app",
        "X-DeviceOS": "Android,7.0",
        "X-User-Type": "customer",
        "X-PhoneMake": "unknown",
        "X-DeviceToken": "",
        "X-PushTokenType": "FCM",
        "X-PhoneModel": "Android,xiaomi redmi note 7",
        "User-uuid": userId,
        Authorization: `Bearer ${jwt}`,
        "Accept-Language": "en-ID",
        "X-User-Locale": "en_ID",
        "X-Location": "65.9667,-18." + randstring(4),
        "X-Location-Accuracy": "10.0",
        "Gojek-Country-Code": "ID",
        "X-M1":
          '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:"WiredSSID",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631627063',
        "Content-Type": "application/json; charset=UTF-8",
        Host: "customer.gopayapi.com",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip",
        "User-Agent": "okhttp/3.12.13",
      },

      body: JSON.stringify(boday),
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

const GetFirst = (url) =>
  new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        Host: "pay-blipay.blibli.com",
        Accept: "application/json, text/plain, */*",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest",
        "Sec-Ch-Ua-Mobile": "?0",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.91 Safari/537.36",
        "Sec-Ch-Ua-Platform": '""',
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        Referer: url,
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9",
        Cookie:
          "__bwa_user_id=1432166451.U.4304523006949049.1665812384; _gcl_au=1.1.1835233709.1681931029; __bwa_user_session_sequence=2; _ga=GA1.1.970023744.1665812384; _abck=1717ED03DD01308DF74438ECDE0C80ED~-1~YAAQlV1idsBUq36HAQAAyNfnmglbzhFVPpzedqOpCDulFQ0wpnn8xXA2Ue/gBmC4ZhPfb2DjpLiqVT0oP1eckFy7iwIwasAky0dtLgG7lMYAZKsqr86vTkwuj+Gk7X12r9Av6CTxwr30GRBiwFs9BDwgm/ES5bSV43DNlBWjNpa3HJKvgYQ6B5ejKHp2+4Ae6vsbv74cuHbb9vE/hXBfJdlkcLP5O0ZEBdoES3Pt0ap1obuQIIyprZ1phC21OQ2G8Y6w7UMltayTcOFYfvEek71peBi6ua/eThOxyXBLMrnCPMXnnTcGk0esfrgIzE8zTawmDGWnYrGIbuFNW3ij9ZBJ3fDv3Zczpj1GXyXvhQzemMrP5pvIOThciErFEyYcRQ4+tXWYB+QTjQ==~-1~-1~-1; _ga_G3ZP2F3MW9=GS1.1.1681931058.1.1.1681931168.60.0.0; __cf_bm=o.s1Cr8um3itMAjHjJtJ2JMhawfcD9Ui.0kxTcdl0FU-1686239735-0-AWcYLi4g7OC1Qe1uUwzKyhsGbgHGhSNtKQeBpUWUb+gHmlWnuXIw5PgnNBNtgW2zwPM5X/B7k2Tw2aUXr0yK968=",
      },
      redirect: "manual",
    })
      .then((res) => res.text())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
const GetQr = (IdPayment) =>
  new Promise((resolve, reject) => {
    fetch(
      `https://pay-blipay.blibli.com/user-api/pay/orders/${IdPayment}/status`,
      {
        headers: {
          Host: "pay-blipay.blibli.com",
          Accept: "application/json, text/plain, */*",
          "Cache-Control": "no-cache",
          "X-Requested-With": "XMLHttpRequest",
          "Sec-Ch-Ua-Mobile": "?0",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.91 Safari/537.36",
          "Sec-Ch-Ua-Platform": '""',
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          Referer: `https://pay-blipay.blibli.com/pay/${IdPayment}/polling`,
          "Accept-Encoding": "gzip, deflate",
          "Accept-Language": "en-US,en;q=0.9",
          Cookie:
            "__bwa_user_id=1432166451.U.4304523006949049.1665812384; _gcl_au=1.1.1835233709.1681931029; __bwa_user_session_sequence=2; _ga=GA1.1.970023744.1665812384; _abck=1717ED03DD01308DF74438ECDE0C80ED~-1~YAAQlV1idsBUq36HAQAAyNfnmglbzhFVPpzedqOpCDulFQ0wpnn8xXA2Ue/gBmC4ZhPfb2DjpLiqVT0oP1eckFy7iwIwasAky0dtLgG7lMYAZKsqr86vTkwuj+Gk7X12r9Av6CTxwr30GRBiwFs9BDwgm/ES5bSV43DNlBWjNpa3HJKvgYQ6B5ejKHp2+4Ae6vsbv74cuHbb9vE/hXBfJdlkcLP5O0ZEBdoES3Pt0ap1obuQIIyprZ1phC21OQ2G8Y6w7UMltayTcOFYfvEek71peBi6ua/eThOxyXBLMrnCPMXnnTcGk0esfrgIzE8zTawmDGWnYrGIbuFNW3ij9ZBJ3fDv3Zczpj1GXyXvhQzemMrP5pvIOThciErFEyYcRQ4+tXWYB+QTjQ==~-1~-1~-1; _ga_G3ZP2F3MW9=GS1.1.1681931058.1.1.1681931168.60.0.0; __cf_bm=o.s1Cr8um3itMAjHjJtJ2JMhawfcD9Ui.0kxTcdl0FU-1686239735-0-AWcYLi4g7OC1Qe1uUwzKyhsGbgHGhSNtKQeBpUWUb+gHmlWnuXIw5PgnNBNtgW2zwPM5X/B7k2Tw2aUXr0yK968=",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
const Generateurl = (urlqr) =>
  new Promise((resolve, reject) => {
    fetch(`https://zxing.org/w/decode?u=${urlqr}`, {
      body: null,
      method: "GET",
    })
      .then((res) => res.text())
      .then((text) => {
        resolve(text);
      })
      .catch((err) => reject(err));
  });
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();
let dataconfig = "";
client.on("message", (message) => {
  if (message.body.includes("!config")) {
    const config = message.body;
    // console.log(config);
    dataconfig = config;
    client.sendMessage(message.id.remote, "Configurasi Berhasil Ditambahkan");
  }
  if (message.body.includes("!cek")) {
    // console.log(dataconfig);
    if (!dataconfig) {
      client.sendMessage(message.id.remote, "Configurasi Masih Kosong");
    } else {
      client.sendMessage(
        message.id.remote,
        "data : \n" +
          "Email : " +
          dataconfig.split("|")[1] +
          "\n" +
          "PasswordApp : " +
          dataconfig.split("|")[2]
      );
    }

    // message.reply(
    //   "data : \n" +
    //     "Email : " +
    //     dataconfig.split("|")[1] +
    //     "\n" +
    //     "PasswordApp :" +
    //     dataconfig.split("|")[2]
    // );
  }
  if (message.body.includes("!clear")) {
    dataconfig = "";
    client.sendMessage(message.id.remote, "Configurasi Berhasil Dihapus");
  }

  //   console.log(message.id.id);
  if (message.body.includes("!yafi")) {
    // console.log(message);
    (async () => {
      const data = message.body;
      console.log(data);
      await delay(2000);
      const email = data.split("|")[2];
      console.log(email);
      const password = "Babiguling123!"; //readline.question(
      //   message.reply("Prosess Login");
      const UserId = uuidv4();
      const Session = uuidv4();
      const RequestID = uuidv4();
      const DfToken = await randstr(43);
      const request = new blibli(UserId, Session, RequestID, DfToken);
      console.log(
        chalk.yellowBright(`[ INFO ] `) + chalk.blueBright("Email " + email)
      );
      const Login = await request.Login(email, password);
      const ParseLogin = JSON.stringify(Login);
      if (
        ParseLogin.includes(
          "login using new device is detected, please do challenge otp"
        )
      ) {
        const chalenge = Login.data.challenge.token;
        const MemanggilOtp = await request.RequestOTP(chalenge);
        if (MemanggilOtp.status === "OK") {
          console.log(
            chalk.yellowBright(`[ INFO ] `) + chalk.greenBright("OTP Dikirim")
          );
          // await delay(4000);
          // const connection = await imaps.connect(READ_MAIL_CONFIG);
          // // console.log("CONNECTION SUCCESSFUL", new Date().toString());
          // const box = await connection.openBox("INBOX");
          // const searchCriteria = ["ALL", ["TO", email]];
          // const fetchOptions = {
          //   bodies: ["HEADER", "TEXT"],
          //   markSeen: false,
          // };
          // let results;
          // let validasiemailotp;
          // do {
          //   results = await connection.search(searchCriteria, fetchOptions);
          //   //   console.log(results);
          //   validasiemailotp = JSON.stringify(results);
          // } while (!validasiemailotp.includes("attributes"));
          // // console.log(results[0]["parts"][1]["body"]);
          // // results.forEach((res) => {
          // //   const text = res.parts.filter((part) => {
          // //     return part.which === "TEXT";
          // //   });
          // //   let emailHTML = text[0].body;
          // let emailText = convert(results[0]["parts"][1]["body"]);
          // // console.log(emailText);
          // const parsing = emailText.split("Kode verifikasi: ")[1];
          // const babi = parsing.split("<=")[0];
          // const jancok = babi.replace(/\D/gm, "");
          // const otpnew = jancok;
          // // });
          // connection.end();
          // console.log(
          //   chalk.yellowBright(`[ INFO ] `) +
          //     chalk.greenBright("OTP DETECT " + otpnew)
          // );
          // const otp = otpnew;
          // let parsing;
          const dataasu = dataconfig.split("|");
          let results;
          let connection;
          do {
            await delay(3000);
            connection = await imaps.connect({
              imap: {
                password: dataasu[2],
                user: dataasu[1],
                host: "imap.mail.yahoo.com",
                port: 993,
                authTimeout: 0,
                tls: true,
                tlsOptions: { rejectUnauthorized: false },
              },
            });
            // console.log("CONNECTION SUCCESSFUL", new Date().toString());
            const box = await connection.openBox("INBOX");
            const searchCriteria = ["ALL", ["TO", email]];
            const fetchOptions = {
              bodies: ["HEADER", "TEXT"],
              markSeen: false,
            };

            results = await connection.search(searchCriteria, fetchOptions);
            try {
              let emailText = convert(
                results[results.length - 1]["parts"][1]["body"]
              );
              // console.log(emailText);
              parsing = emailText
                .split("Kode verifikasi: ")[1]
                .split("<=")[0]
                .split(" ")[1];
              // console.log(parsing);
            } catch (error) {
              console.log(
                chalk.yellowBright(`[ INFO ] `) +
                  chalk.redBright("Belum DItemukan")
              );
              try {
                let emailText = convert(results[1]["parts"][1]["body"]);
                // console.log(emailText);
                parsing = emailText
                  .split("Kode verifikasi: ")[1]
                  .split("<=")[0]
                  .split(" ")[1];
                // console.log(parsing);
              } catch (error) {
                console.log(
                  chalk.yellowBright(`[ INFO ] `) +
                    chalk.redBright("Belum DItemukan")
                );
                try {
                  let emailText = convert(results[0]["parts"][1]["body"]);
                  // console.log(emailText);
                  parsing = emailText
                    .split("Kode verifikasi: ")[1]
                    .split("<=")[0]
                    .split(" ")[1];
                  // console.log(parsing);
                } catch (error) {
                  console.log(
                    chalk.yellowBright(`[ INFO ] `) +
                      chalk.redBright("Belum DItemukan")
                  );
                }
              }
            }
          } while (!parsing);
          // });
          connection.end();
          const otp = parsing;
          const verify = await request.RegisLogin(email, otp, chalenge);
          if (verify.access_token) {
            console.log(
              chalk.yellowBright(`[ INFO ] `) +
                chalk.greenBright("Login Succesfully")
            );
            // message.reply("Success Login");
            const Token = verify.access_token;
            const dataAccount = await request.CeckStatusAccount(Token);
            if (dataAccount.data.wallet.pinRegistered === true) {
              console.log(
                chalk.yellowBright(`[ INFO ] `) +
                  chalk.greenBright(
                    "Status Pin [ " +
                      dataAccount.data.wallet.pinRegistered +
                      " ]"
                  )
              );
            } else {
              console.log(
                chalk.yellowBright(`[ INFO ] `) +
                  chalk.redBright(
                    "Status Pin [ " +
                      dataAccount.data.wallet.pinRegistered +
                      " ]"
                  )
              );
              // continue;
            }
            const saldo = dataAccount.data.wallet.balance;
            console.log(
              chalk.yellowBright(`[ INFO ] `) +
                chalk.greenBright("Saldo Account [ " + saldo + " ]")
            );
            let kode;
            const Voucher = await request.CekVoucher(Token);
            if (Voucher.data.length >= 0) {
              for (let index = 0; index < Voucher.data.length; index++) {
                const nameVoucher = Voucher.data[index].name;

                if (
                  nameVoucher.includes("Miss You") ||
                  nameVoucher.includes("Kangen") ||
                  nameVoucher.includes("100%")
                ) {
                  console.log(
                    chalk.yellowBright(`[ INFO ] `) +
                      chalk.greenBright(
                        "Terdeteksi Voucher [ " + nameVoucher + " ]"
                      )
                  );
                  const maskCb = Voucher.data[index].maximumDiscount;
                  console.log(
                    chalk.yellowBright(`[ INFO ] `) +
                      chalk.greenBright("Maks Cb [ " + maskCb + " ]")
                  );
                  kode = Voucher.data[index].code;
                } else {
                  console.log(
                    chalk.yellowBright(`[ INFO ] `) +
                      chalk.redBright("Tidak Terdeteksi Voucher ")
                  );
                }
              }
            }
            if ((kode === null) | (kode === undefined)) {
              console.log(
                chalk.yellowBright(`[ INFO ] `) +
                  chalk.redBright("Tidak Terdeteksi Voucher ")
              );
              // continue;
            }
            const Cart = await request.DeleteCartDigital(Token);
            if (Cart.status === "OK") {
              console.log(
                chalk.yellowBright(`[ INFO ] `) +
                  chalk.greenBright("Try Add Cart ")
              );
              const IdToken = data.split("|")[1].toString();
              client.sendMessage(
                message.id.remote,
                "Prosess Nomor Token : " + IdToken
              );
              console.log(
                chalk.yellowBright(`[ INFO ] `) +
                  chalk.greenBright("List Price : ")
              );
              let sku;
              let listing = 1;
              const listtoken = await request.CekTokenList(Token);
              listtoken.data.products.forEach((element) => {
                console.log("[ " + listing + " ] " + element.name);
                listing++;
              });
              const Pilihan = 2; // readline.question(
              //   chalk.yellowBright(`[ INFO ] `) + "Pilih Nominal : "
              // );
              const Checkout = await request.PayToken(
                Token,
                IdToken,
                listtoken.data.products[Pilihan - 1].sku,
                listtoken.data.products[Pilihan - 1].nominal
              );
              // console.log(Checkout.data);
              if (Checkout.status === "OK") {
                console.log(
                  chalk.yellowBright(`[ INFO ] `) +
                    chalk.greenBright("Try Check Add Cart ")
                );
                const CekCheckout = await request.CekCartDigital(Token);
                if (CekCheckout.status === "OK") {
                  console.log(
                    chalk.yellowBright(`[ INFO ] `) +
                      chalk.greenBright("Get Payment ")
                  );

                  const PaymentAdd = await request.ApplydVoucher(Token, kode);
                  // console.log(PaymentAdd);
                  if (PaymentAdd.status === "OK") {
                    client.sendMessage(
                      message.id.remote,
                      "Berhasil Prosess Tunggu Beberapa Menit"
                    );
                    console.log(
                      chalk.yellowBright(`[ INFO ] `) +
                        chalk.greenBright("Payment Processing ")
                    );
                    const Pay = await request.PaymentDigitalQris(Token);
                    if (Pay.status === "OK") {
                      const Final = await request.PaymentFinalQRIS(Token);
                      // console.log(Final);
                      await GetFirst(Final.data.redirectUrl);
                      const IdPay = Final.data.redirectUrl
                        .split("/pay/orders/")[1]
                        .split("/")[0];
                      // console.log(IdPay);
                      let CheckingQr;
                      do {
                        CheckingQr = await GetQr(IdPay);
                      } while (
                        CheckingQr.data.transactionInfo.status === "PENDING"
                      );
                      await delay(2000);
                      // console.log(
                      //   CheckingQr.data.transactionInfo.redirect.data.qr
                      // );
                      const generateQR = await Generateurl(
                        CheckingQr.data.transactionInfo.redirect.data.qr
                      );
                      const qrcode = generateQR.split(
                        "</pre></td></tr><tr><td>Barcode format</td><td>QR_CODE</td></tr><tr><td>Parsed Result Type</td><td>TEXT</td></tr><tr><td>Parsed Result</td><td><pre>"
                      )[1];
                      const dataqrbarcode = qrcode.split(
                        "</pre></td></tr></table></div></body></html>"
                      )[0];
                      console.log("Scan Here..\n");
                      console.log(
                        await QRCode.toString(dataqrbarcode, {
                          width: 8,
                          type: "terminal",
                          errorCorrectionLevel: "L",
                          small: true,
                        })
                      );
                      const toket =
                        "eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJhdWQiOlsiZ29qZWs6Y29uc3VtZXI6YXBwIl0sImRhdCI6eyJhY3RpdmUiOiJ0cnVlIiwiYmxhY2tsaXN0ZWQiOiJmYWxzZSIsImNvdW50cnlfY29kZSI6Iis2MiIsImNyZWF0ZWRfYXQiOiIyMDIyLTA5LTE1VDA4OjAxOjAxWiIsImVtYWlsIjoibHVrbWFuYW1hbGluYTgzQGRpZ2l0YWxrdS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ImZhbHNlIiwiZ29wYXlfYWNjb3VudF9pZCI6IjAxLWE4YTgyOWU2NDkyNjRmNzdhYjI0NmRhMWNlZjJlNDQ2LTMyIiwibmFtZSI6Ikx1a21hbiIsIm51bWJlciI6IjgxOTMyNDM1MTA5IiwicGhvbmUiOiIrNjI4MTkzMjQzNTEwOSIsInNpZ25lZF91cF9jb3VudHJ5IjoiSUQiLCJ3YWxsZXRfaWQiOiIyMjI1ODA0ODEyNDIwMDg4MzAifSwiZXhwIjoxNjkzMzQ2NDA5LCJpYXQiOjE2OTA0MjcxOTYsImlzcyI6ImdvaWQiLCJqdGkiOiJmNzE4YjU5NS05N2ZhLTQzOWEtYTIxMC02OGE3YzUyZDExYTAiLCJzY29wZXMiOltdLCJzaWQiOiI4MmJmYmM3Yy05MWY2LTQ4MWYtOGI5My04MWEwYzE3NjI2NWMiLCJzdWIiOiI4NjlhMzcxMy0wYmRjLTQyYjEtOTE5MS05NDQzMmU2ODg2NmUiLCJ1aWQiOiI3ODMxODE2NTYiLCJ1dHlwZSI6ImN1c3RvbWVyIn0.WRb0wfWp4W7KxT-w1-ip8aq-LBG6S9mSHwqexfbaoW4vlaQwnOSKvU_rvfD6l1Fp7wuVlPgtXIkBTbOHrzNxbbK4sAXdWsU_NceJigS4ObOviWZPHwfOJOgJs8H4QLGc-fzp5Fy417aXQkyKsmkokocs9t3hSopHiMSQiONKWqE"; //readlineSync.question(" Masukan TOKEN ?");
                      const id = "783181656";
                      const sessionId = uuidv4();
                      const uniqueId = await genUniqueId(16);
                      const requestGetNewJwtResult = await GetdataAccount(
                        toket,
                        uniqueId,
                        sessionId
                      );
                      // console.log(requestGetNewJwtResult);
                      if (requestGetNewJwtResult["message"] == "OK") {
                        console.log(
                          chalk.yellowBright(`[ INFO ] `) +
                            chalk.greenBright("Account Gojek Valid")
                        );
                        const history = await balance(
                          sessionId,
                          toket,
                          id,
                          uniqueId
                        );
                        console.log(
                          chalk.yellowBright(`[ INFO ] `) +
                            chalk.greenBright(history.data[0].balance.value)
                        );

                        const GojekEksekusiBarcode = await QR(
                          sessionId,
                          toket,
                          id,
                          uniqueId,
                          dataqrbarcode
                        );
                        // console.log(GojekEksekusiBarcode.data);
                        console.log(
                          chalk.yellowBright(`[ INFO ] `) +
                            chalk.greenBright("Generating Pay WIth Qr")
                        );

                        const additional_databarcode =
                          GojekEksekusiBarcode.data.additional_data;
                        const checksumbarcode =
                          GojekEksekusiBarcode.data.checksum;
                        const metadatabarcode =
                          GojekEksekusiBarcode.data.metadata;

                        const body = {
                          additional_data: additional_databarcode,
                          applied_promo_code: ["NO_PROMO_APPLIED"],
                          channel_type: "DYNAMIC_QR",
                          checksum: checksumbarcode,
                          metadata: metadatabarcode,
                          order_signature: {
                            partner_id: "",
                            reason: "",
                            customer_fulfillment_type: "",
                            partner_name: "",
                            transaction_type: "",
                            source: "",
                            channel_type: "",
                          },
                          payment_instructions: [
                            {
                              amount: {
                                currency: "IDR",
                                value: 52750,
                              },
                              token:
                                "eyJ0eXBlIjoiR09QQVlfV0FMTEVUIiwiaWQiOiIiLCJwYXltZW50X29wdGlvbl9pZCI6ImViYWE3YTU3LWM5NjEtNGFhMC04MmI2LWJhMWQ5OTVmZmU5ZCIsImluc3RhbGxtZW50X29wdGlvbl9pZCI6IiJ9",
                              type: "GOPAY_WALLET",
                            },
                          ],
                        };
                        // console.log(body);
                        const historys = await balance(
                          sessionId,
                          toket,
                          id,
                          uniqueId
                        );
                        console.log(
                          chalk.yellowBright(`[ INFO ] `) +
                            chalk.greenBright(
                              "Sisa Saldo : Rp. " +
                                historys.data[0].balance.value
                            )
                        );
                        // const Paymebel = await PayQr(sessionId, toket, id, uniqueId, body);
                        const merchatid = GojekEksekusiBarcode.data.payment_id;

                        const Gaspay = await Paycok(
                          sessionId,
                          toket,
                          id,
                          uniqueId,
                          merchatid,
                          body
                        );
                        // console.log(Gaspay);
                        await delay(3000);

                        const Gaspay2 = await Paycok2(
                          sessionId,
                          toket,
                          id,
                          uniqueId,
                          merchatid,
                          body
                        );
                        console.log(
                          chalk.yellowBright(`[ INFO ] `) +
                            chalk.greenBright(JSON.stringify(Gaspay2))
                        );
                      } else {
                        console.log(
                          chalk.red("[+] ") + "Status Account Not Valid"
                        );
                      }
                      const IdPesnanan = Final.data.orderId;
                      let CekPesananStatus;
                      let Validasi;
                      do {
                        CekPesananStatus = await request.CekStatusPesanan(
                          Token,
                          IdPesnanan
                        );
                        Validasi = JSON.stringify(CekPesananStatus);
                        await delay(3000);
                        // console.log(
                        //   chalk.yellowBright(`[ INFO ] `) +
                        //     chalk.redBright("Tagihan Belum Dibayar")
                        // );
                      } while (!Validasi.includes("TRANSACTION_SUCCESS"));
                      console.log(
                        chalk.yellowBright(`[ INFO ] `) +
                          chalk.greenBright(
                            "Status [ " +
                              CekPesananStatus.data[0].transactionStatus +
                              " ] "
                          )
                      );
                      console.log("[+] Mencoba Mengirim Pesan ");
                      // do {
                      try {
                        const text =
                          "ID TOKEN [ " +
                          IdToken +
                          " ] \n" +
                          "Pemilik [ " +
                          Checkout.data.inquiryInfo.customerName +
                          " ] \n" +
                          "Token PLN [ " +
                          CekPesananStatus.data[0].additionalData.tokenPln +
                          " ] \n" +
                          "Jumlah KWH [ " +
                          CekPesananStatus.data[0].additionalData.JML_KWH +
                          " ]";
                        client.sendMessage(message.id.remote, text);
                        client.sendMessage("120363165758679527@g.us", text);
                      } catch (error) {
                        console.log(error);
                      }
                      // } while (true);

                      console.log(
                        chalk.yellowBright(`[ DATA INFO ] \n`) +
                          chalk.greenBright(
                            "ID TOKEN [ " +
                              IdToken +
                              " ] \n" +
                              "Pemilik [ " +
                              Checkout.data.inquiryInfo.customerName +
                              " ] \n" +
                              "Token PLN [ " +
                              CekPesananStatus.data[0].additionalData.tokenPln +
                              " ] \n" +
                              "Jumlah KWH [ " +
                              CekPesananStatus.data[0].additionalData.JML_KWH +
                              " ]"
                          )
                      );
                    } else {
                      console.log(Pay);
                    }
                  } else {
                    console.log(PaymentAdd);
                    client.sendMessage(
                      message.id.remote,
                      "Gagal Prosses Tidak Ada Voucher"
                    );
                  }
                } else {
                  console.log(CekCheckout);
                }
              } else {
                console.log(Checkout);
              }
            } else {
              console.log(Cart);
            }
          } else {
            console.log(chalk.redBright("Login Gagal"));
          }
        } else {
          console.log(chalk.redBright("Gagal Kirim OTP "));
        }
      } else {
        console.log(chalk.redBright(ParseLogin));
      }

      console.log("");
      await delay(5000);
    })();
  }
  if (message.body.includes("!token")) {
    (async () => {
      const data = message.body;
      console.log(data);
      await delay(2000);
      const email = data.split("|")[2];
      console.log(email);
      const password = "Babiguling123!"; //readline.question(
      //   message.reply("Prosess Login");
      const UserId = uuidv4();
      const Session = uuidv4();
      const RequestID = uuidv4();
      const DfToken = await randstr(43);
      const request = new blibli(UserId, Session, RequestID, DfToken);
      console.log(
        chalk.yellowBright(`[ INFO ] `) + chalk.blueBright("Email " + email)
      );
      const Login = await request.Login(email, password);
      const ParseLogin = JSON.stringify(Login);
      if (
        ParseLogin.includes(
          "login using new device is detected, please do challenge otp"
        )
      ) {
        const chalenge = Login.data.challenge.token;
        const MemanggilOtp = await request.RequestOTP(chalenge);
        if (MemanggilOtp.status === "OK") {
          console.log(
            chalk.yellowBright(`[ INFO ] `) + chalk.greenBright("OTP Dikirim")
          );
          // await delay(4000);
          // const connection = await imaps.connect(READ_MAIL_CONFIG);
          // // console.log("CONNECTION SUCCESSFUL", new Date().toString());
          // const box = await connection.openBox("INBOX");
          // const searchCriteria = ["ALL", ["TO", email]];
          // const fetchOptions = {
          //   bodies: ["HEADER", "TEXT"],
          //   markSeen: false,
          // };
          // let results;
          // let validasiemailotp;
          // do {
          //   results = await connection.search(searchCriteria, fetchOptions);
          //   //   console.log(results);
          //   validasiemailotp = JSON.stringify(results);
          // } while (!validasiemailotp.includes("attributes"));
          // // console.log(results[0]["parts"][1]["body"]);
          // // results.forEach((res) => {
          // //   const text = res.parts.filter((part) => {
          // //     return part.which === "TEXT";
          // //   });
          // //   let emailHTML = text[0].body;
          // let emailText = convert(results[0]["parts"][1]["body"]);
          // // console.log(emailText);
          // const parsing = emailText.split("Kode verifikasi: ")[1];
          // const babi = parsing.split("<=")[0];
          // const jancok = babi.replace(/\D/gm, "");
          // const otpnew = jancok;
          // // });
          // connection.end();
          // console.log(
          //   chalk.yellowBright(`[ INFO ] `) +
          //     chalk.greenBright("OTP DETECT " + otpnew)
          // );
          // const otp = otpnew;
          // let parsing;
          const dataasu = dataconfig.split("|");
          let results;
          let connection;
          do {
            await delay(3000);
            connection = await imaps.connect({
              imap: {
                password: dataasu[2],
                user: dataasu[1],
                host: "imap.mail.yahoo.com",
                port: 993,
                authTimeout: 10000,
                tls: true,
                tlsOptions: { rejectUnauthorized: false },
              },
            });
            // console.log("CONNECTION SUCCESSFUL", new Date().toString());
            const box = await connection.openBox("INBOX");
            const searchCriteria = ["ALL", ["TO", email]];
            const fetchOptions = {
              bodies: ["HEADER", "TEXT"],
              markSeen: false,
            };

            results = await connection.search(searchCriteria, fetchOptions);
            try {
              let emailText = convert(
                results[results.length - 1]["parts"][1]["body"]
              );
              // console.log(emailText);
              parsing = emailText
                .split("Kode verifikasi: ")[1]
                .split("<=")[0]
                .split(" ")[1];
              // console.log(parsing);
            } catch (error) {
              console.log(
                chalk.yellowBright(`[ INFO ] `) +
                  chalk.redBright("Belum DItemukan")
              );
              try {
                let emailText = convert(results[1]["parts"][1]["body"]);
                // console.log(emailText);
                parsing = emailText
                  .split("Kode verifikasi: ")[1]
                  .split("<=")[0]
                  .split(" ")[1];
                // console.log(parsing);
              } catch (error) {
                console.log(
                  chalk.yellowBright(`[ INFO ] `) +
                    chalk.redBright("Belum DItemukan")
                );
                try {
                  let emailText = convert(results[0]["parts"][1]["body"]);
                  // console.log(emailText);
                  parsing = emailText
                    .split("Kode verifikasi: ")[1]
                    .split("<=")[0]
                    .split(" ")[1];
                  // console.log(parsing);
                } catch (error) {
                  console.log(
                    chalk.yellowBright(`[ INFO ] `) +
                      chalk.redBright("Belum DItemukan")
                  );
                }
              }
            }
          } while (!parsing);
          // });
          connection.end();
          const otp = parsing;
          const verify = await request.RegisLogin(email, otp, chalenge);
          if (verify.access_token) {
            console.log(
              chalk.yellowBright(`[ INFO ] `) +
                chalk.greenBright("Login Succesfully")
            );
            // message.reply("Success Login");
            const Token = verify.access_token;
            const dataAccount = await request.CeckStatusAccount(Token);
            if (dataAccount.data.wallet.pinRegistered === true) {
              console.log(
                chalk.yellowBright(`[ INFO ] `) +
                  chalk.greenBright(
                    "Status Pin [ " +
                      dataAccount.data.wallet.pinRegistered +
                      " ]"
                  )
              );
            } else {
              console.log(
                chalk.yellowBright(`[ INFO ] `) +
                  chalk.redBright(
                    "Status Pin [ " +
                      dataAccount.data.wallet.pinRegistered +
                      " ]"
                  )
              );
              // continue;
            }
            const saldo = dataAccount.data.wallet.balance;
            console.log(
              chalk.yellowBright(`[ INFO ] `) +
                chalk.greenBright("Saldo Account [ " + saldo + " ]")
            );
            let kode;
            const Voucher = await request.CekVoucher(Token);
            if (Voucher.data.length >= 0) {
              for (let index = 0; index < Voucher.data.length; index++) {
                const nameVoucher = Voucher.data[index].name;

                if (
                  nameVoucher.includes("Miss You") ||
                  nameVoucher.includes("Kangen") ||
                  nameVoucher.includes("100%")
                ) {
                  console.log(
                    chalk.yellowBright(`[ INFO ] `) +
                      chalk.greenBright(
                        "Terdeteksi Voucher [ " + nameVoucher + " ]"
                      )
                  );
                  const maskCb = Voucher.data[index].maximumDiscount;
                  console.log(
                    chalk.yellowBright(`[ INFO ] `) +
                      chalk.greenBright("Maks Cb [ " + maskCb + " ]")
                  );
                  kode = Voucher.data[index].code;
                } else {
                  console.log(
                    chalk.yellowBright(`[ INFO ] `) +
                      chalk.redBright("Tidak Terdeteksi Voucher ")
                  );
                }
              }
            }
            if ((kode === null) | (kode === undefined)) {
              console.log(
                chalk.yellowBright(`[ INFO ] `) +
                  chalk.redBright("Tidak Terdeteksi Voucher ")
              );
              // continue;
            }
            const Cart = await request.DeleteCartDigital(Token);
            if (Cart.status === "OK") {
              console.log(
                chalk.yellowBright(`[ INFO ] `) +
                  chalk.greenBright("Try Add Cart ")
              );
              const IdToken = data.split("|")[1].toString();
              client.sendMessage(
                message.id.remote,
                "Prosess Nomor Token : " + IdToken
              );
              console.log(
                chalk.yellowBright(`[ INFO ] `) +
                  chalk.greenBright("List Price : ")
              );
              let sku;
              let listing = 1;
              const listtoken = await request.CekTokenList(Token);
              listtoken.data.products.forEach((element) => {
                console.log("[ " + listing + " ] " + element.name);
                listing++;
              });
              const Pilihan = 2; // readline.question(
              //   chalk.yellowBright(`[ INFO ] `) + "Pilih Nominal : "
              // );
              const Checkout = await request.PayToken(
                Token,
                IdToken,
                listtoken.data.products[Pilihan - 1].sku,
                listtoken.data.products[Pilihan - 1].nominal
              );
              // console.log(Checkout.data);
              if (Checkout.status === "OK") {
                console.log(
                  chalk.yellowBright(`[ INFO ] `) +
                    chalk.greenBright("Try Check Add Cart ")
                );
                const CekCheckout = await request.CekCartDigital(Token);
                if (CekCheckout.status === "OK") {
                  console.log(
                    chalk.yellowBright(`[ INFO ] `) +
                      chalk.greenBright("Get Payment ")
                  );

                  const PaymentAdd = await request.ApplydVoucher(Token, kode);
                  // console.log(PaymentAdd);
                  if (PaymentAdd.status === "OK") {
                    client.sendMessage(
                      message.id.remote,
                      "Berhasil Prosess Tunggu Beberapa Menit"
                    );
                    console.log(
                      chalk.yellowBright(`[ INFO ] `) +
                        chalk.greenBright("Payment Processing ")
                    );
                    const Pay = await request.PaymentDigitalQris(Token);
                    if (Pay.status === "OK") {
                      const Final = await request.PaymentFinalQRIS(Token);
                      // console.log(Final);
                      await GetFirst(Final.data.redirectUrl);
                      const IdPay = Final.data.redirectUrl
                        .split("/pay/orders/")[1]
                        .split("/")[0];
                      // console.log(IdPay);
                      let CheckingQr;
                      do {
                        CheckingQr = await GetQr(IdPay);
                      } while (
                        CheckingQr.data.transactionInfo.status === "PENDING"
                      );
                      await delay(2000);
                      // console.log(
                      //   CheckingQr.data.transactionInfo.redirect.data.qr
                      // );
                      const generateQR = await Generateurl(
                        CheckingQr.data.transactionInfo.redirect.data.qr
                      );
                      const qrcode = generateQR.split(
                        "</pre></td></tr><tr><td>Barcode format</td><td>QR_CODE</td></tr><tr><td>Parsed Result Type</td><td>TEXT</td></tr><tr><td>Parsed Result</td><td><pre>"
                      )[1];
                      const dataqrbarcode = qrcode.split(
                        "</pre></td></tr></table></div></body></html>"
                      )[0];
                      console.log("Scan Here..\n");
                      console.log(
                        await QRCode.toString(dataqrbarcode, {
                          width: 8,
                          type: "terminal",
                          errorCorrectionLevel: "L",
                          small: true,
                        })
                      );
                      const toket =
                        "eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJhdWQiOlsiZ29qZWs6Y29uc3VtZXI6YXBwIl0sImRhdCI6eyJhY3RpdmUiOiJ0cnVlIiwiYmxhY2tsaXN0ZWQiOiJmYWxzZSIsImNvdW50cnlfY29kZSI6Iis2MiIsImNyZWF0ZWRfYXQiOiIyMDIyLTA5LTE1VDA4OjAxOjAxWiIsImVtYWlsIjoibHVrbWFuYW1hbGluYTgzQGRpZ2l0YWxrdS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ImZhbHNlIiwiZ29wYXlfYWNjb3VudF9pZCI6IjAxLWE4YTgyOWU2NDkyNjRmNzdhYjI0NmRhMWNlZjJlNDQ2LTMyIiwibmFtZSI6Ikx1a21hbiIsIm51bWJlciI6IjgxOTMyNDM1MTA5IiwicGhvbmUiOiIrNjI4MTkzMjQzNTEwOSIsInNpZ25lZF91cF9jb3VudHJ5IjoiSUQiLCJ3YWxsZXRfaWQiOiIyMjI1ODA0ODEyNDIwMDg4MzAifSwiZXhwIjoxNjkzMzQ2NDA5LCJpYXQiOjE2OTA0MjcxOTYsImlzcyI6ImdvaWQiLCJqdGkiOiJmNzE4YjU5NS05N2ZhLTQzOWEtYTIxMC02OGE3YzUyZDExYTAiLCJzY29wZXMiOltdLCJzaWQiOiI4MmJmYmM3Yy05MWY2LTQ4MWYtOGI5My04MWEwYzE3NjI2NWMiLCJzdWIiOiI4NjlhMzcxMy0wYmRjLTQyYjEtOTE5MS05NDQzMmU2ODg2NmUiLCJ1aWQiOiI3ODMxODE2NTYiLCJ1dHlwZSI6ImN1c3RvbWVyIn0.WRb0wfWp4W7KxT-w1-ip8aq-LBG6S9mSHwqexfbaoW4vlaQwnOSKvU_rvfD6l1Fp7wuVlPgtXIkBTbOHrzNxbbK4sAXdWsU_NceJigS4ObOviWZPHwfOJOgJs8H4QLGc-fzp5Fy417aXQkyKsmkokocs9t3hSopHiMSQiONKWqE"; //readlineSync.question(" Masukan TOKEN ?");
                      const id = "783181656";
                      const sessionId = uuidv4();
                      const uniqueId = await genUniqueId(16);
                      const requestGetNewJwtResult = await GetdataAccount(
                        toket,
                        uniqueId,
                        sessionId
                      );
                      // console.log(requestGetNewJwtResult);
                      if (requestGetNewJwtResult["message"] == "OK") {
                        console.log(
                          chalk.yellowBright(`[ INFO ] `) +
                            chalk.greenBright("Account Gojek Valid")
                        );
                        const history = await balance(
                          sessionId,
                          toket,
                          id,
                          uniqueId
                        );
                        console.log(
                          chalk.yellowBright(`[ INFO ] `) +
                            chalk.greenBright(history.data[0].balance.value)
                        );

                        const GojekEksekusiBarcode = await QR(
                          sessionId,
                          toket,
                          id,
                          uniqueId,
                          dataqrbarcode
                        );
                        // console.log(GojekEksekusiBarcode.data);
                        console.log(
                          chalk.yellowBright(`[ INFO ] `) +
                            chalk.greenBright("Generating Pay WIth Qr")
                        );

                        const additional_databarcode =
                          GojekEksekusiBarcode.data.additional_data;
                        const checksumbarcode =
                          GojekEksekusiBarcode.data.checksum;
                        const metadatabarcode =
                          GojekEksekusiBarcode.data.metadata;

                        const body = {
                          additional_data: additional_databarcode,
                          applied_promo_code: ["NO_PROMO_APPLIED"],
                          channel_type: "DYNAMIC_QR",
                          checksum: checksumbarcode,
                          metadata: metadatabarcode,
                          order_signature: {
                            partner_id: "",
                            reason: "",
                            customer_fulfillment_type: "",
                            partner_name: "",
                            transaction_type: "",
                            source: "",
                            channel_type: "",
                          },
                          payment_instructions: [
                            {
                              amount: {
                                currency: "IDR",
                                value: 52750,
                              },
                              token:
                                "eyJ0eXBlIjoiR09QQVlfV0FMTEVUIiwiaWQiOiIiLCJwYXltZW50X29wdGlvbl9pZCI6ImViYWE3YTU3LWM5NjEtNGFhMC04MmI2LWJhMWQ5OTVmZmU5ZCIsImluc3RhbGxtZW50X29wdGlvbl9pZCI6IiJ9",
                              type: "GOPAY_WALLET",
                            },
                          ],
                        };
                        // console.log(body);
                        const historys = await balance(
                          sessionId,
                          toket,
                          id,
                          uniqueId
                        );
                        console.log(
                          chalk.yellowBright(`[ INFO ] `) +
                            chalk.greenBright(
                              "Sisa Saldo : Rp. " +
                                historys.data[0].balance.value
                            )
                        );
                        // const Paymebel = await PayQr(sessionId, toket, id, uniqueId, body);
                        const merchatid = GojekEksekusiBarcode.data.payment_id;

                        const Gaspay = await Paycok(
                          sessionId,
                          toket,
                          id,
                          uniqueId,
                          merchatid,
                          body
                        );
                        // console.log(Gaspay);
                        await delay(3000);

                        const Gaspay2 = await Paycok2(
                          sessionId,
                          toket,
                          id,
                          uniqueId,
                          merchatid,
                          body
                        );
                        console.log(
                          chalk.yellowBright(`[ INFO ] `) +
                            chalk.greenBright(JSON.stringify(Gaspay2))
                        );
                      } else {
                        console.log(
                          chalk.red("[+] ") + "Status Account Not Valid"
                        );
                      }
                      const IdPesnanan = Final.data.orderId;
                      let CekPesananStatuss;
                      let Validasis;
                      do {
                        CekPesananStatuss = await request.CekStatusPesanan(
                          Token,
                          IdPesnanan
                        );
                        Validasis = JSON.stringify(CekPesananStatuss);
                        await delay(3000);
                        // console.log(
                        //   chalk.yellowBright(`[ INFO ] `) +
                        //     chalk.redBright("Tagihan Belum Dibayar")
                        // );
                      } while (!Validasis.includes("TRANSACTION_SUCCESS"));
                      console.log(
                        chalk.yellowBright(`[ INFO ] `) +
                          chalk.greenBright(
                            "Status [ " +
                              CekPesananStatuss.data[0].transactionStatus +
                              " ] "
                          )
                      );
                      console.log("[+] Mencoba Mengirim Pesan ");
                      // do {
                      try {
                        const text =
                          "ID TOKEN [ " +
                          IdToken +
                          " ] \n" +
                          "Pemilik [ " +
                          Checkout.data.inquiryInfo.customerName +
                          " ] \n" +
                          "Token PLN [ " +
                          CekPesananStatuss.data[0].additionalData.tokenPln +
                          " ] \n" +
                          "Jumlah KWH [ " +
                          CekPesananStatuss.data[0].additionalData.JML_KWH +
                          " ]";
                        client.sendMessage(message.id.remote, text);
                        // client.sendMessage("120363165758679527@g.us", text);
                      } catch (error) {
                        console.log(error);
                      }
                      // } while (true);

                      console.log(
                        chalk.yellowBright(`[ DATA INFO ] \n`) +
                          chalk.greenBright(
                            "ID TOKEN [ " +
                              IdToken +
                              " ] \n" +
                              "Pemilik [ " +
                              Checkout.data.inquiryInfo.customerName +
                              " ] \n" +
                              "Token PLN [ " +
                              CekPesananStatuss.data[0].additionalData
                                .tokenPln +
                              " ] \n" +
                              "Jumlah KWH [ " +
                              CekPesananStatuss.data[0].additionalData.JML_KWH +
                              " ]"
                          )
                      );
                    } else {
                      console.log(Pay);
                    }
                  } else {
                    console.log(PaymentAdd);
                    client.sendMessage(
                      message.id.remote,
                      "Gagal Prosses Tidak Ada Voucher"
                    );
                  }
                } else {
                  console.log(CekCheckout);
                }
              } else {
                console.log(Checkout);
              }
            } else {
              console.log(Cart);
            }
          } else {
            console.log(chalk.redBright("Login Gagal"));
          }
        } else {
          console.log(chalk.redBright("Gagal Kirim OTP "));
        }
      } else {
        console.log(chalk.redBright(ParseLogin));
      }

      console.log("");
      await delay(5000);
    })();
  }
});
