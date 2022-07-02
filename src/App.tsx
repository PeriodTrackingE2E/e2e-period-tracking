import { Component, createSignal } from "solid-js";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import logo from "./logo.svg";
import styles from "./App.module.css";

const App: Component = () => {
  const [textData, setTextData] = createSignal("");
  const [key, setKey] = createSignal("");
  const [result, setResult] = createSignal("no result");
  const [decryptResult, setDecryptResult] = createSignal("no result");

  return (
    <div class={styles.App}>
      <div class="container">
        <h1>E2E Tracking app</h1>
        <div class="row">
          <div class="six columns">
            <p>Insert key</p>
            <input
              type="text"
              value={key()}
              onChange={(e: Event) => {
                setKey((e.target as HTMLInputElement).value);
              }}
            />
            <p>Insert data</p>
            <input
              type="text"
              value={textData()}
              onChange={(e: Event) => {
                setTextData((e.target as HTMLInputElement).value);
              }}
            />
            <button
              onClick={() => {
                setResult(aes.encrypt(textData(), key()).toString());
              }}
            >
              Encrypt
            </button>
            <div>{result()}</div>
          </div>
          <div class="six columns">
            <p>Insert key for Decryption</p>
            <input
              type="text"
              value={key()}
              onChange={(e: Event) => {
                setKey((e.target as HTMLInputElement).value);
              }}
            />
            <button
              onClick={() => {
                let bytes = aes.decrypt(result(), key());
                setDecryptResult(bytes.toString(CryptoJS.enc.Utf8));
              }}
            >
              Decrypt
            </button>
            <p>{decryptResult()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
