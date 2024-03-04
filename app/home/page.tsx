import { EventCardList } from "./_components/EventCardList";

export default function Home() {
  return (
    <main className="flex flex-col p-4">
      <h1 className="font-semibold mb-4">Eventos</h1>
      <EventCardList />
    </main>
  );
}
