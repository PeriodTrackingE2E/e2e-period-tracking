import { Component, ComponentProps, createSignal } from "solid-js";
import { DayJournal, IDayObject, Period, Symptom } from "../../helpers/models";
import styles from "./Diary.module.css";
import DiaryTab from "./DiaryTab";

interface IDiary {
  onEdit: (value: IDayObject) => void;
  monthData: IDayObject[];
  dayNumber: number;
}

export const Diary: Component<IDiary> = ({ monthData, dayNumber }) => {
  return (
    <div class={styles.diary}>
      <h5>Diario del ciclo</h5>
      {DayJournal.map((data, i) => (
        <DiaryTab
          tab={data}
          tabIndex={i}
          onEdit={(value) => {
            const tabObj = { title: DayJournal[i].title, values: value };
            const newMonthData = monthData.map((day) => {
              if (day.number === dayNumber) {
                const res = { ...day, data: tabObj };
                console.log("res", res);
              }
              return day;
            });
          }}
        />
      ))}
    </div>
  );
};
