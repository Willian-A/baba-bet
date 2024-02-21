import { Event } from "../_components/eventCard";

import { EventModal } from "../_components/eventModal";

const mockedEvents = [
  {
    title: "Casamento do Arthur",
    positiveOdd: { value: 5.34, label: "Não convidado" },
    negativeOdd: { value: 1.27, label: "Convidado" },
  },
  //  {
  //    title: "Roleta do Bicho",
  //    positiveOdd: { value: 2.54, label: "Macaco" },
  //    negativeOdd: { value: 1.07, label: "Urubu" },
  //  },
];

const selectOptions = [
  {
    value: "willian",
    label: "Willian",
  },
  {
    value: "gabriel pires",
    label: "Gabriel Pires",
  },
  {
    value: "cassio",
    label: "Cássio",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col p-4">
      <h1 className="font-semibold mb-4">Eventos</h1>
      {mockedEvents.map((value, index) => (
        <div key={index}>
          <Event modalID={`event-${index}`} {...value} />
          <EventModal
            modalID={`event-${index}`}
            selectOptions={selectOptions}
            selectPlaceholder="Selecione um Convidado"
            betValuePlaceholder="Digite o valor da Aposta"
            {...value}
          />
        </div>
      ))}
    </main>
  );
}
