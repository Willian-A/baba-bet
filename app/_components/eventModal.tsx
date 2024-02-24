"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Option, SelectInput } from "./select";
import { Modal } from "./modal";
import { EventProps } from "./eventCard";
import { useToastStore } from "../_stores/toast";
import { Spinner } from "./spinner";
import { useModalStore } from "../_stores/modal";
import { SessionData } from "../_types/sessionData";

interface EventModalProps extends EventProps {
  selectOptions: Option[];
  selectPlaceholder: string;
}

const betSchema = z
  .object({
    maxBetValue: z.number(),
    options: z.string(),
    betValue: z.string(),
    selectedOdd: z.string(),
    oddValue: z.number(),
  })
  .refine((data) => Number(data.maxBetValue) >= Number(data.betValue), {
    message: "Você não tem essa quantia de pontos",
    path: ["betValue"],
  });

type BetSchemaType = z.infer<typeof betSchema>;

export function EventModal({
  modalID,
  title,
  selectOptions,
  negativeOdd,
  positiveOdd,
  selectPlaceholder,
}: EventModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const setToastProps = useToastStore((state) => state).setToastProps;
  const setOpenModalID = useModalStore((state) => state.setOpenModalID);
  const [meData, setMeData] = useState<SessionData | undefined>();
  //  const [bets, setBets] = useState();

  //  const getBets = async () => {
  //    try {
  //      const res = await fetch(`/api/bets?id=${}`), {
  //        method: "GET",
  //      });
  //      setBets(await res.json());
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  };

  const getMe = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "GET",
      });
      setMeData(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
    //getBets();
  }, []);

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

  useEffect(() => {
    meData && setValue("maxBetValue", meData.points);
  }, [meData]);

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
          render={({ field: { onChange } }) => (
            <SelectInput
              options={selectOptions}
              placeholder={selectPlaceholder}
              onChange={onChange}
            />
          )}
        />

        {!!watch("options") && (
          <div className="mt-2">
            <label>Digite o valor da aposta:</label>
            <input
              className="mt-2 max-w-[300px] input"
              placeholder={`Você tem ${meData?.points} pontos`}
              type="number"
              {...register("betValue")}
            />
            <p className="mb-2 mt-1 px-1 text-error-400">
              {errors.betValue?.message}
            </p>
          </div>
        )}
        {!!watch("options") && Number(watch("betValue")) > 0 && (
          <div>
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
