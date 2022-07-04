import { Component, createSignal, onMount } from "solid-js";
import aes from "crypto-js/aes";
import styles from "./App.module.css";
import Calendar from "./components/calendar/Calendar";
import { aesDec, aesDecMonth, aesEnc, aesEncMonth } from "./helpers/aes";
import Diary from "./components/diary/Diary";
import { IDayObject } from "./helpers/models";

const App: Component = () => {
  const dangerousKey = "1234567890123456";
  const [queryDate, setQueryDate] = createSignal<string>(
    new Date().getMonth().toString() + new Date().getFullYear().toString()
  );

  const [monthData, setMonthData] = createSignal<IDayObject[]>([]);

  onMount(() => {
    const decrypted = aesDecMonth(queryDate(), dangerousKey);
    let decryptedMonth: IDayObject[] = [];
    if (!decrypted) {
      const totalDays = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        0
      ).getDate();

      const emptyMonth: IDayObject[] = Array.from(Array(totalDays).keys()).map(
        (day) => {
          return {
            data: null,
            number: day + 1,
          };
        }
      );

      aesEncMonth(emptyMonth, queryDate(), dangerousKey);
      decryptedMonth = emptyMonth;
    } else {
      console.log("Data found");
      decryptedMonth = aesDecMonth(queryDate(), dangerousKey);
      console.log("decryptedMonth", decryptedMonth);
    }
    setMonthData(decryptedMonth);
  });

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
