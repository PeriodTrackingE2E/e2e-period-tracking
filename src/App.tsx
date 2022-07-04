import { Component, createSignal, onMount } from "solid-js";
import styles from "./App.module.css";
import Calendar from "./components/calendar/Calendar";
import { aesDecMonth, aesEncMonth } from "./helpers/aes";
import { Diary } from "./components/diary/Diary";
import { IDayObject } from "./helpers/models";

const App: Component = () => {
  const dangerousKey = "1234567890123456";
  const [queryDate, setQueryDate] = createSignal<string>(
    new Date().getMonth().toString() + new Date().getFullYear().toString()
  );
  const [selectedDay, setSelectedDay] = createSignal<number>(
    new Date().getDate()
  );

  const getMonthData = (): IDayObject[] => {
    const decrypted = aesDecMonth(queryDate(), dangerousKey);

    let decryptedMonth: IDayObject[] = [];
    if (decrypted.length === 0) {
      console.log("no data");

      const totalDays = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        0
      ).getDate();

      const emptyMonth: IDayObject[] = Array.from(Array(totalDays).keys()).map(
        (day) => {
          return {
            data: {
              period: null,
              symptoms: [],
            },
            number: day + 1,
          };
        }
      );

      aesEncMonth(emptyMonth, queryDate(), dangerousKey);
      decryptedMonth = emptyMonth;
    } else {
      console.log("Data found");
      decryptedMonth = aesDecMonth(queryDate(), dangerousKey);
    }
    console.log("decryptedMonth", decryptedMonth);

    return decryptedMonth;
  };

  const [monthData, setMonthData] = createSignal<IDayObject[]>(getMonthData());

  return (
    <div class={styles.App}>
      <div class="container">
        <h1>E2E Tracking app {selectedDay}</h1>
        <Calendar
          monthData={monthData()}
          onSelect={(num) => setSelectedDay(num)}
        />
        <Diary
          monthData={monthData()}
          dayNumber={selectedDay()}
          onEdit={(value) => {
            console.log("value", value);

            setMonthData(value);
            aesEncMonth(value, queryDate(), dangerousKey);
          }}
        />
      </div>
    </div>
  );
};

export default App;
