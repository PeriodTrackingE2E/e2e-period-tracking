import styles from "./Diary.module.css";
import { Component, ComponentProps, createSignal } from "solid-js";
import { DayJournal, IDayJournal, Period, Symptom } from "../../helpers/models";

interface DiaryTabProps {
  tab: IDayJournal;
  tabIndex: number;
  onSelect?: (value: string) => void;
}

export const DiaryTab: Component<DiaryTabProps> = ({
  tab,
  tabIndex,
  onSelect = () => {},
}) => {
  const [selectedValue, setSelectedValue] = createSignal<
    Period | Symptom | string
  >("");

  const [symptoms, setSymptoms] = createSignal<Symptom[]>(["Acne"]);
  return (
    <div class={styles.diary__day}>
      <div class={styles.diary__day__title}>{tab.title}</div>
      <div class={styles.diary__day__content}>
        {tab.values.map((value) => (
          <div
            class={styles.diary__day__value}
            onClick={() => {
              if (tabIndex === 1) {
                if (!symptoms().includes(value as Symptom)) {
                  setSymptoms([...symptoms(), value as Symptom]);
                } else {
                  setSymptoms(symptoms().filter((s: Symptom) => s !== value));
                }
              } else {
                setSelectedValue(value);
              }
              onSelect(value);
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
  );
};

export default DiaryTab;
