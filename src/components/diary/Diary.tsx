import { Component, ComponentProps, createSignal } from "solid-js";
import { DayJournal, Period, Symptom } from "../../helpers/models";
import styles from "./Diary.module.css";

function Diary() {
  const [selectedValue, setSelectedValue] = createSignal<
    Period | Symptom | string
  >("");

  const [symptoms, setSymptoms] = createSignal<Symptom[]>(["Acne"]);
  return (
    <div class={styles.diary}>
      <h5>Diario del ciclo</h5>
      {DayJournal.map((data, i) => (
        <div class={styles.diary__day}>
          <div class={styles.diary__day__title}>{data.title}</div>
          <div class={styles.diary__day__content}>
            {data.values.map((value) => (
              <div
                class={styles.diary__day__value}
                onClick={() => {
                  if (i === 1) {
                    if (!symptoms().includes(value as Symptom)) {
                      setSymptoms([...symptoms(), value as Symptom]);
                    } else {
                      setSymptoms(
                        symptoms().filter((s: Symptom) => s !== value)
                      );
                    }
                  } else {
                    setSelectedValue(value);
                  }
                }}
              >
                <div class={styles.diary__day__value__icon}>
                  {symptoms().includes(value as Symptom) ? "✔" : ""}
                  {value === selectedValue() ? "✔" : ""}
                </div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Diary;
