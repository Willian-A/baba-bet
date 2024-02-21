"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Option, SelectInput } from "./select";
import { Modal } from "./modal";
import { EventProps } from "./eventCard";
import { useToastStore } from "../_stores/toast";
import { Spinner } from "./spinner";
import { useModalStore } from "../_stores/modal";

interface EventModalProps extends EventProps {
  selectOptions: Option[];
  selectPlaceholder: string;
  betValuePlaceholder: string;
}

export const betSchema = z.object({
  options: z.string(),
  betValue: z.string(),
  selectedOdd: z.string(),
  oddValue: z.number(),
});

export type BetSchemaType = z.infer<typeof betSchema>;

export function EventModal({
  modalID,
  title,
  selectOptions,
  negativeOdd,
  positiveOdd,
  selectPlaceholder,
  betValuePlaceholder,
}: EventModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const setToastProps = useToastStore((state) => state).setToastProps;
  const setOpenModalID = useModalStore((state) => state.setOpenModalID);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<BetSchemaType>({ resolver: zodResolver(betSchema) });

  const positiveOddColor =
    getValues("selectedOdd") === "positiveOdd"
      ? "bg-success-400 text-success-800"
      : "bg-success-100 text-success-600";
  const negativeOddColor =
    getValues("selectedOdd") === "negativeOdd"
      ? "bg-error-400 text-error-800"
      : "bg-error-100 text-error-300";

  async function postData(data: BetSchemaType) {
    setIsLoading(true);
    const res = await fetch("/api/bets", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setIsLoading(false);
      return setToastProps({
        isOpen: true,
        description: "Houve um erro ao salvar, tente novamente mais tarde",
        variant: "error",
      });
    }

    setIsLoading(false);
    setOpenModalID(null);
    reset();
    return setToastProps({
      isOpen: true,
      description: "Aposta feita com sucesso",
      variant: "success",
    });
  }

  return (
    <Modal modalID={modalID}>
      <h2 className="mb-4">{title}</h2>
      <form onSubmit={handleSubmit(postData)}>
        <Controller
          control={control}
          name="options"
          render={({ field: { onChange, ref } }) => (
            <SelectInput
              options={selectOptions}
              placeholder={selectPlaceholder}
              onChange={onChange}
            />
          )}
        />

        {!!watch("options") && (
          <input
            className="mt-2 max-w-[300px] input"
            placeholder={betValuePlaceholder}
            type="number"
            {...register("betValue")}
          />
        )}
        {!!watch("options") && Number(watch("betValue")) > 0 && (
          <div className="mt-2">
            <label>Selecione o resultado desejado:</label>
            <div className="flex w-full mt-1 justify-between gap-2">
              <div
                className={`py-2 w-full flex flex-col items-center justify-center rounded-md w-full font-bold ${positiveOddColor}`}
                onClick={() => {
                  setValue("selectedOdd", "positiveOdd");
                  setValue("oddValue", positiveOdd.value);
                }}
              >
                <h5 className="mb-1">{positiveOdd.value}</h5>
                <h4>{positiveOdd.label}</h4>
              </div>
              <div
                className={`p-1 w-full flex flex-col items-center justify-center rounded-md w-full font-bold ${negativeOddColor}`}
                onClick={() => {
                  setValue("selectedOdd", "negativeOdd");
                  setValue("oddValue", negativeOdd.value);
                }}
              >
                <h5 className="mb-1">{negativeOdd.value}</h5>
                <h4>{negativeOdd.label}</h4>
              </div>
            </div>
          </div>
        )}
        {!!watch("options") &&
          Number(watch("betValue")) > 0 &&
          watch("selectedOdd") && (
            <button className="btn-primary mt-6" type="submit">
              {isLoading ? <Spinner /> : "Confirmar"}
            </button>
          )}
      </form>
    </Modal>
  );
}
