import styles from "./Diary.module.css";
import { Component, ComponentProps, createSignal } from "solid-js";
import {
  IDayJournalTab,
  IDayObject,
  Period,
  Symptom,
} from "../../helpers/models";

interface DiaryTabProps {
  tab: IDayJournalTab;
  tabIndex: number;
  onSelect?: (value: string) => void;
  onEdit: (value: string | Symptom[]) => void;
}

export const DiaryTab: Component<DiaryTabProps> = ({
  tab,
  tabIndex,
  onEdit = () => {},
}) => {
  const [selectedValue, setSelectedValue] = createSignal<
    Period | Symptom | string
  >("");

  const [showContent, setShowContent] = createSignal<boolean>(false);

  const [symptoms, setSymptoms] = createSignal<Symptom[]>([]);
  return (
    <div class={styles.diary__day}>
      <div
        class={styles.diary__day__title}
        onClick={() => setShowContent(!showContent())}
      >
        <div>{tab.title}</div>
        <div>{showContent() ? "-" : "+"}</div>
      </div>
      <div
        class={styles.diary__day__content}
        style={{ display: showContent() ? "block" : "none" }}
      >
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
                onEdit(symptoms());
              } else {
                setSelectedValue(value);
                onEdit(value);
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
  );
};

export default DiaryTab;
