import { Component, ComponentProps, createSignal } from "solid-js";
import { DayJournal } from "../../helpers/models";
import styles from "./Diary.module.css";

interface DiaryProps {
  // add props here
}

function Diary(props: DiaryProps) {
  return (
    <div class={styles.diary}>
      <h5>Diario del ciclo</h5>
      {DayJournal.map((data) => (
        <div class={styles.diary__day}>
          <div class={styles.diary__day__title}>{data.title}</div>
          <div class={styles.diary__day__content}>
            {data.values.map((value) => (
              <div class={styles.diary__day__value}>{value}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Diary;
