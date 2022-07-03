import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";

export const aesEnc = (textData: string, key: string): string => {
  const timestamp: number = Math.floor(new Date().getTime() / 1000);
  localStorage.setItem(
    "updated",
    aes.encrypt(timestamp.toString(), key).toString()
  );
  return aes.encrypt(textData, key).toString();
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
