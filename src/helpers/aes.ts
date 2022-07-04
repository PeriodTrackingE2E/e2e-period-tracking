import aes from "crypto-js/aes";
import sha256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";
import { IDayObject } from "./models";

export const aesEnc = (textData: string, key: string): string => {
  const timestamp: number = Math.floor(new Date().getTime() / 1000);
  localStorage.setItem(
    "updated",
    aes.encrypt(timestamp.toString(), key).toString()
  );
  return aes.encrypt(textData, key).toString();
};
export const aesEncMonth = (
  monthData: IDayObject[],
  dateKey: string,
  key: string
): string => {
  const enc = aesEnc(JSON.stringify(monthData), key);
  localStorage.setItem(sha256(dateKey).toString(), enc);
  return enc;
};

export const aesDecMonth = (dateKey: string, key: string): IDayObject[] => {
  let data = localStorage.getItem(sha256(dateKey).toString());
  if (data) {
    const decData = aesDec(data, key);

    return JSON.parse(aesDec(data, key));
  }
  return [];
};
export const aesDec = (textData: string, key: string): string => {
  let bytes = aes.decrypt(textData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const getLastUpdated = (key: string): number => {
  const timestamp: string = localStorage.getItem("updated") || "error";
  if (timestamp !== "error") {
    return parseInt(aesDec(timestamp, key));
  }
  return 0;
};
