import { Component, ComponentProps, createSignal } from "solid-js";
import { DayJournal, IDayObject, Period, Symptom } from "../../helpers/models";
import styles from "./Diary.module.css";
import DiaryTab from "./DiaryTab";

interface IDiary {
  onEdit: (value: IDayObject[]) => void;
  monthData: IDayObject[];
  dayNumber: number;
}

export const Diary: Component<IDiary> = ({
  monthData,
  dayNumber,
  onEdit = () => {},
}) => {
  return (
    <div class={styles.diary}>
      <h5>Diario del ciclo</h5>
      {DayJournal.map((tabData, i) => (
        <DiaryTab
          tab={tabData}
          tabIndex={i}
          selectedValues={monthData[dayNumber - 1].data[DayJournal[i].id] || ""}
          onEdit={(value) => {
            let newMonth = [...monthData];
            newMonth[dayNumber - 1].data[DayJournal[i].id] = value;
            console.log("newMonth", newMonth);
            onEdit(newMonth);
          }}
        />
      ))}
    </div>
  );
};
