"use client";

import { useEffect, useState } from "react";

import { EventCard } from "@/app/_components/EventCard";
import { EventModal } from "@/app/_components/EventModal";
import { EventType } from "@/app/_types/event";

export function EventCardList() {
  const [events, setEvents] = useState<EventType[] | undefined>();

  const getEvents = async () => {
    try {
      const res = await fetch("/api/events", {
        method: "GET",
      });
      const response = await res.json();
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return events?.map((value, index) => (
    <div key={index}>
      <EventCard modalID={`event-${value._id}`} {...value} />
      <EventModal
        modalID={`event-${value._id}`}
        selectOptions={value.input.options}
        selectPlaceholder="Selecione um Convidado"
        {...value}
      />
    </div>
  ));
}
