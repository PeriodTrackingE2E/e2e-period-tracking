import styles from "./Diary.module.css";
import {
  Component,
  ComponentProps,
  createEffect,
  createSignal,
} from "solid-js";
import {
  IDayJournalTab,
  IDayObject,
  Period,
  Symptom,
} from "../../helpers/models";

interface DiaryTabProps {
  tab: IDayJournalTab;
  selectedValues: Period | Symptom[] | string;
  tabIndex: number;
  onSelect?: (value: string) => void;
  onEdit: (value: Period | Symptom[] | null) => void;
}

export const DiaryTab: Component<DiaryTabProps> = (props) => {
  const [selectedValue, setSelectedValue] = createSignal<
    Period | Symptom[] | string
  >(props.selectedValues || "");

  const [showContent, setShowContent] = createSignal<boolean>(false);

  const [symptoms, setSymptoms] = createSignal<Symptom[]>(
    props.tabIndex === 1 ? (props.selectedValues as Symptom[]) : []
  );
  console.log("props.selectedValues", props.selectedValues);

  createEffect(() => {
    setSymptoms(props.selectedValues as Symptom[]);
  });

  return (
    <div class={styles.diary__day}>
      <div
        class={styles.diary__day__title}
        onClick={() => setShowContent(!showContent())}
      >
        <div>{props.tab.title}</div>
        <div>{showContent() ? "-" : "+"}</div>
      </div>
      <div
        class={styles.diary__day__content}
        style={{ display: showContent() ? "block" : "none" }}
      >
        {props.tab.values.map((value) => (
          <div
            class={styles.diary__day__value}
            onClick={() => {
              if (props.tabIndex === 1) {
                if (!symptoms().includes(value as Symptom)) {
                  setSymptoms([...symptoms(), value as Symptom]);
                } else {
                  setSymptoms(symptoms().filter((s: Symptom) => s !== value));
                }
                props.onEdit(symptoms());
              } else {
                setSelectedValue(value);
                props.onEdit(value as Period);
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
