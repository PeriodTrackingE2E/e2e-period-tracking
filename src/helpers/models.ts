export type Symptom =
  | "Acne"
  | "Alterazioni del sonno"
  | "Alterazioni appetito"
  | "Brividi"
  | "Caduta di capelli"
  | "Costipazione"
  | "Crampi addominali"
  | "Diarrea"
  | "Lombare"
  | "Dolore pelvico"
  | "Gonfiore"
  | "Incontinenza"
  | "Mal di testa"
  | "Pelle secca"
  | "Sbalzi di umore "
  | "Seno dolorante"
  | "Stanchezza"
  | "Sudorazione notturna"
  | "Vampate di calore"
  | "Vuoto di memoria";

export const SymptomsArr: Symptom[] = [
  "Acne",
  "Alterazioni del sonno",
  "Alterazioni appetito",
  "Brividi",
  "Caduta di capelli",
  "Costipazione",
  "Crampi addominali",
  "Diarrea",
  "Lombare",
  "Dolore pelvico",
  "Gonfiore",
  "Incontinenza",
  "Mal di testa",
  "Pelle secca",
  "Sbalzi di umore ",
  "Seno dolorante",
  "Stanchezza",
  "Sudorazione notturna",
  "Vampate di calore",
  "Vuoto di memoria",
];
export type testResult = "Positivo" | "Negativo" | "Indeterminato";

export type Period = "Flusso assente" | "Leggero" | "Medio" | "Abbondante";

export const PeriodArr: Period[] = [
  "Flusso assente",
  "Leggero",
  "Medio",
  "Abbondante",
];

export const DayJournal = [
  {
    title: "Mestruazioni",
    values: PeriodArr,
  },
  {
    title: "Sintomi",
    values: SymptomsArr,
  },
];

/* values

Rapporto sessuale 
Protezione 
Utilizzata 
Non utilizzata 

Test ovulazione 
Positivo fertilità massima 
Fertilità elevata 
Positivo fertilità bassa 
Indeterminato 

Risultato test del progesterone 
Positivo 
Negativo 
Indeterminato 

Qualità muco cervicale 
Albume d'uovo 
Acquoso 
Cremoso 
Viscoso 
Secco 

Spotting 
Con spotting 
*/
