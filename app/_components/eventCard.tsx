"use client";

import { useModalStore } from "../_stores/modal";
import { EventType } from "../_types/event";

export interface EventCardProps extends EventType {
  modalID: string;
}

export function EventCard({
  name,
  winOdd,
  loseOdd,
  modalID,
  ...rest
}: EventCardProps) {
  const setOpenModalID = useModalStore((state) => state.setOpenModalID);

  return (
    <article
      className="card max-w-[400px]"
      onClick={() => setOpenModalID(modalID)}
      {...rest}
    >
      <h3 className="mb-3">{name}</h3>
      <div className="flex w-full justify-between gap-2">
        <div className="py-2 w-full flex flex-col items-center justify-center rounded-md w-full font-bold bg-success-400 text-success-800">
          <h5 className="mb-1">{winOdd.value}</h5>
          <h4>{winOdd.label}</h4>
        </div>
        <div className="p-1 w-full flex flex-col items-center justify-center rounded-md w-full font-bold bg-error-400 text-error-800">
          <h5 className="mb-1">{loseOdd.value}</h5>
          <h4>{loseOdd.label}</h4>
        </div>
      </div>
    </article>
  );
}
