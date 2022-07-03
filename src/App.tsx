import { Component, createSignal } from "solid-js";
import aes from "crypto-js/aes";
import styles from "./App.module.css";
import Calendar from "./components/calendar/Calendar";
import { aesDec, aesEnc } from "./helpers/aes";
import Diary from "./components/diary/Diary";

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
        <Diary />
      </div>
    </div>
  );
};

export default App;
