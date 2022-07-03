import { Component, ComponentProps, createSignal } from "solid-js";
import { DayJournal, Period, Symptom } from "../../helpers/models";
import styles from "./Diary.module.css";
import DiaryTab from "./DiaryTab";

function Diary() {
  return (
    <div class={styles.diary}>
      <h5>Diario del ciclo</h5>
      {DayJournal.map((data, i) => (
        <DiaryTab tab={data} tabIndex={i} />
      ))}
    </div>
  );
}

export default Diary;
