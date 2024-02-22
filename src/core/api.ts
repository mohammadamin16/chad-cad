import axios from "axios";
import routes from "./routes";
import db from "../db";

const config = {
  method: "post",
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
    //    Authorization:
    //      "Bearer [Your Token]",
  },
};

async function getToken(): Promise<string> {
  try {
    return await db.getValue("token");
  } catch {
    throw new Error("No Token");
  }
}
export async function getPrice(
  request: RequestNewPrice,
): Promise<{ data?: ResponseNewPrice; err?: string }> {
  const customConfig = {
    ...config,
    url: routes["newPrice"],
    data: JSON.stringify(request),
    header: { ...config.headers, Authorization: `Bearer ${await getToken()}` },
  };

  try {
    const response = await axios.request(customConfig);
    const data = response.data.data as ResponseNewPrice;
    return { data };
  } catch (err: any) {
    console.error(err);
    if (err.isAxiosError) {
      return { err: err.message };
    }
    return { err: "Unknown error" };
  }
}

export async function getPlaces(
  request: RequestPlace,
): Promise<{ data?: ResponsePlace; err?: string }> {
  const customConfig = {
    ...config,
    url: routes["place"],
    data: JSON.stringify(request),
    method: "get",
    headers: { ...config.headers, Authorization: `Bearer ${await getToken()}` },
  };

  try {
    const response = await axios.request(customConfig);
    const data = response.data.data as ResponsePlace;
    return { data: data };
  } catch (err: any) {
    console.error(err);
    if (err.isAxiosError) {
      return { err: err.message };
    }
    return { err: "Unknown error" };
  }
}

export async function ride(
  request: RequestRide,
): Promise<{ data?: ResponseRide; err?: string }> {
  const customConfig = {
    ...config,
    url: routes["ride"],
    data: JSON.stringify(request),
    header: { ...config.headers, Authorization: `Bearer ${await getToken()}` },
  };

  try {
    const response = await axios.request(customConfig);
    const data = response.data.data as ResponseRide;
    return { data: data };
  } catch (err: any) {
    console.error(err);
    if (err.isAxiosError) {
      return { err: err.message };
    }
    return { err: "Unknown error" };
  }
}

export async function otp(
  request: RequestOtp,
): Promise<{ data?: ResponseOtp; err?: string }> {
  const customConfig = {
    ...config,
    url: routes["otp"],
    data: JSON.stringify(request),
    headers: {
      authority: "app.snapp.taxi",
      accept: "*/*",
      "accept-language": "en-US,en;q=0.7",
      "app-version": "pwa",
      baggage:
        "sentry-environment=production,sentry-release=passenger-pwa%40v17.12.1,sentry-public_key=b86c19afb49347ae808c64dc42f7e213,sentry-trace_id=8c574f06d3e64c02aa6177ef0c8f9334",
      "content-type": "application/json",
      locale: "fa-IR",
      origin: "https://app.snapp.taxi",
      referer: "https://app.snapp.taxi/login/?redirect_to=%2F",
      "sec-ch-ua": '"Not A(Brand";v="99", "Brave";v="121", "Chromium";v="121"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "sentry-trace": "8c574f06d3e64c02aa6177ef0c8f9334-ada5f837b60113c4-0",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
      "x-app-name": "passenger-pwa",
      "x-app-version": "17.12.1",
    },
  };

  try {
    const response = await axios.request(customConfig);
    const data = response.data as ResponseOtp;
    console.log("OTP", data);
    return { data: data };
  } catch (err: any) {
    console.error(err);
    if (err.isAxiosError) {
      return { err: err.message };
    }
    return { err: "Unknown error" };
  }
}

export async function auth(
  request: RequestAuth,
): Promise<{ data?: ResponseAuth; err?: string }> {
  const customConfig = {
    ...config,
    url: routes["auth"],
    data: JSON.stringify(request),
    headers: {
      authority: "app.snapp.taxi",
      accept: "*/*",
      "accept-language": "en-US,en;q=0.7",
      "app-version": "pwa",
      baggage:
        "sentry-environment=production,sentry-release=passenger-pwa%40v17.12.1,sentry-public_key=b86c19afb49347ae808c64dc42f7e213,sentry-trace_id=8378bb42dab949a88e7e7962fd3381c1",
      "content-type": "application/json",
      locale: "fa-IR",
      origin: "https://app.snapp.taxi",
      referer:
        "https://app.snapp.taxi/verify-cellphone-otp/?cellphone=09912147018&redirect_to=/",
      "sec-ch-ua": '"Not A(Brand";v="99", "Brave";v="121", "Chromium";v="121"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "sentry-trace": "8378bb42dab949a88e7e7962fd3381c1-a4b0c991df7596e3-0",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
      "x-app-name": "passenger-pwa",
      "x-app-version": "17.12.1",
    },
  };

  try {
    const response = await axios.request(customConfig);
    const data = response.data as ResponseAuth;
    console.log("data", data);
    return { data: data };
  } catch (err: any) {
    console.error(err);
    if (err.isAxiosError) {
      return { err: err.message };
    }
    return { err: "Unknown error" };
  }
}
