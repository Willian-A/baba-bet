"use client";

import { useModalStore } from "../_stores/modal";

export interface EventProps {
  modalID: string;
  title: string;
  positiveOdd: { value: number; label: string };
  negativeOdd: { value: number; label: string };
}

export function Event({
  title,
  positiveOdd,
  negativeOdd,
  modalID,
  ...rest
}: EventProps) {
  const setOpenModalID = useModalStore((state) => state.setOpenModalID);

  return (
    <article
      className="card max-w-[400px]"
      onClick={() => setOpenModalID(modalID)}
      {...rest}
    >
      <h3 className="mb-3">{title}</h3>
      <div className="flex w-full justify-between gap-2">
        <div className="py-2 w-full flex flex-col items-center justify-center rounded-md w-full font-bold bg-success-400 text-success-800">
          <h5 className="mb-1">{positiveOdd.value}</h5>
          <h4>{positiveOdd.label}</h4>
        </div>
        <div className="p-1 w-full flex flex-col items-center justify-center rounded-md w-full font-bold bg-error-400 text-error-800">
          <h5 className="mb-1">{negativeOdd.value}</h5>
          <h4>{negativeOdd.label}</h4>
        </div>
      </div>
    </article>
  );
}
