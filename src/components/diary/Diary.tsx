import { Component, ComponentProps, createSignal } from "solid-js";
import { DayJournal, IDayObject, Period, Symptom } from "../../helpers/models";
import styles from "./Diary.module.css";
import DiaryTab from "./DiaryTab";

interface IDiary {
  onEdit: (value: string) => void;
  monthData: IDayObject[];
}

export const Diary: Component<IDiary> = ({ onEdit, monthData }) => {
  return (
    <div class={styles.diary}>
      <h5>Diario del ciclo</h5>
      {DayJournal.map((data, i) => (
        <DiaryTab
          tab={data}
          tabIndex={i}
          onEdit={(value) => console.log("value", value)}
          monthData={monthData}
        />
      ))}
    </div>
  );
};
