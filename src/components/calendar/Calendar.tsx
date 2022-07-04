import { Component, ComponentProps, createSignal } from "solid-js";
import { IDayObject } from "../../helpers/models";
import styles from "./Calendar.module.css";

interface Day {
  name: string;
  number: number;
}

interface ICalendar {
  monthData: IDayObject[];
  onSelect: (value: number) => void;
}

const Calendar: Component<ICalendar> = ({ monthData, onSelect = () => {} }) => {
  console.log(monthData.length);

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
    return Array.from(Array(monthData.length).keys()).map((day) => {
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
        {actualDate.getDate() === selectedDay().number
          ? "Oggi"
          : new Date(
              actualDate.getFullYear(),
              actualDate.getMonth(),
              selectedDay().number
            ).toLocaleString("default", { weekday: "long" })}
        ,{" "}
        {selectedDay().number +
          " " +
          actualDate.toLocaleString("default", { month: "long" })}
      </h3>
      <div class={styles.calendar}>
        <div class={styles.calendar__container}>
          {getDays().map((day, i) => {
            return (
              <div
                class={styles.calendar__day}
                onClick={() => {
                  setSelectedDay(day);
                  onSelect(day.number);
                }}
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
    </div>
  );
};

export default Calendar;
