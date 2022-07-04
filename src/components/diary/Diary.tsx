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
          onEdit={(value) => {
            const tabObj = { title: DayJournal[i].title, values: value };
            const newDay: IDayObject[] = monthData.map((day) => {
              if (day.number === dayNumber) {
                const res = {
                  ...day,
                  data: { ...day.data, [DayJournal[i].id]: tabObj },
                };
                return res;
              }
              return day;
            });
            onEdit(newDay);
          }}
        />
      ))}
    </div>
  );
};
