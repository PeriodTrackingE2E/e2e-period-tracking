import { Component, ComponentProps, createSignal } from "solid-js";
import styles from "./Calendar.module.css";

interface Day {
  name: string;
  number: number;
}

const Calendar: Component = () => {
  const [selectedDay, setSelectedDay] = createSignal<Day>({
    name: getDayName(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
      )
    ),
    number: new Date().getDate(),
  });
  const actualDate = new Date();

  function getDayName(date = new Date(), locale = "it-IT") {
    return date.toLocaleDateString(locale, { weekday: "narrow" });
  }

  const getDays = (): Day[] => {
    const totalDays = new Date(
      actualDate.getFullYear(),
      actualDate.getMonth(),
      0
    ).getDate();

    console.log("totalDays", totalDays);

    return Array.from(Array(totalDays).keys()).map((day) => {
      return {
        name: getDayName(
          new Date(actualDate.getFullYear(), actualDate.getMonth(), day + 1)
        ),
        number: day + 1,
      };
    });
  };

  return (
    <div>
      <h3 class={styles.calendar__title}>
        Oggi,{" "}
        {selectedDay().number +
          " " +
          actualDate.toLocaleString("default", { month: "long" })}
      </h3>
      <div class={styles.calendar}>
        {getDays().map((day) => {
          return (
            <div
              class={styles.calendar__day}
              onClick={() => setSelectedDay(day)}
            >
              <p>{day.name}</p>
              <div
                class={
                  styles.calendar__day__capsule +
                  " " +
                  (day.number === selectedDay().number
                    ? styles["calendar__day__capsule--selected"]
                    : "")
                }
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
