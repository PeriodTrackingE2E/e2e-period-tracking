import { Component, createEffect } from "solid-js";
import { DayJournal, IDayObject } from "../../helpers/models";
import styles from "./Diary.module.css";
import DiaryTab from "./DiaryTab";

interface IDiary {
  onEdit: (value: IDayObject[]) => void;
  monthData: IDayObject[];
  dayNumber: number;
}

export const Diary: Component<IDiary> = (props) => {
  createEffect(() => {
    props.onEdit(props.monthData);
  });

  return (
    <div class={styles.diary}>
      <h5>Diario del ciclo {props.dayNumber}</h5>
      {DayJournal.map((tabData, i) => (
        <DiaryTab
          tab={tabData}
          tabIndex={i}
          selectedValues={
            props.monthData[props.dayNumber - 1].data[DayJournal[i].id] || ""
          }
          onEdit={(value) => {
            let newMonth = [...props.monthData];
            newMonth[props.dayNumber - 1].data[DayJournal[i].id] = value;
            console.log("newMonth", newMonth);
            props.onEdit(newMonth);
          }}
        />
      ))}
    </div>
  );
};
