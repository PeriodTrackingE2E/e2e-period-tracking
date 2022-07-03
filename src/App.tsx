import { Component, createSignal } from "solid-js";
import aes from "crypto-js/aes";
import styles from "./App.module.css";
import Calendar from "./components/calendar/Calendar";
import { aesDec, aesEnc } from "./helpers/aes";

const App: Component = () => {
  const [textData, setTextData] = createSignal("");
  const [key, setKey] = createSignal("");
  const [result, setResult] = createSignal("no result");
  const [decryptResult, setDecryptResult] = createSignal("no result");

  return (
    <div class={styles.App}>
      <div class="container">
        <h1>E2E Tracking app</h1>
        <Calendar />
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
                setResult(aesEnc(textData(), key()));
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
                setDecryptResult(aesDec(result(), key()));
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
