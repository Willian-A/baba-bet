export type EventType = {
  _id: string;
  name: string;
  winOdd: { value: number; label: string };
  loseOdd: { value: number; label: string };
  input: {
    type: "select" | "text";
    options: EventInputOption[];
  };
};

export type EventInputOption = {
  value: string;
  label: string;
};
