"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SelectInput } from "./Select";
import { Modal } from "./Modal";
import { useToastStore } from "../_stores/toast";
import { Spinner } from "./Spinner";
import { useModalStore } from "../_stores/modal";
import { SessionData } from "../_types/sessionData";
import { EventInputOption, EventType } from "../_types/event";
import { BetType } from "../_types/bet";

interface EventModalProps extends EventType {
  modalID: string;
  selectOptions: EventInputOption[];
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
  _id,
  name,
  selectOptions,
  loseOdd,
  winOdd,
  selectPlaceholder,
}: EventModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const setToastProps = useToastStore((state) => state).setToastProps;
  const setOpenModalID = useModalStore((state) => state.setOpenModalID);
  const [showForm, setShowForm] = useState(false);
  const [meData, setMeData] = useState<SessionData | undefined>();
  const [bets, setBets] = useState<BetType[] | undefined>();

  const getBets = async () => {
    try {
      const res = await fetch(`/api/bets?id=${_id}`, {
        method: "GET",
      });
      const response = await res.json();
      setBets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    getBets();
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

  const winOddColor =
    getValues("selectedOdd") === "winOdd"
      ? "bg-success-400 text-success-800"
      : "bg-success-100 text-success-600";
  const loseOddColor =
    getValues("selectedOdd") === "loseOdd"
      ? "bg-error-400 text-error-800"
      : "bg-error-100 text-error-300";

  async function postData(data: BetSchemaType) {
    setIsLoading(true);
    const res = await fetch("/api/bets", {
      method: "POST",
      body: JSON.stringify({ ...data, eventID: _id }),
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
    setShowForm(false);
    reset();
    return setToastProps({
      isOpen: true,
      description: "Aposta feita com sucesso",
      variant: "success",
    });
  }

  const ShowBets = () => {
    if (bets && !showForm) {
      return (
        <>
          {bets.map((bet) => {
            const isLoseOdd = bet.selectedOdd === "loseOdd";
            const label = isLoseOdd ? loseOdd.label : winOdd.label;
            const betContainerColor = isLoseOdd
              ? "bg-error-400 text-error-800"
              : "bg-success-400 text-success-800";

            return (
              <div
                key={bet._id}
                className="border-2 border-background-800 rounded-md p-2 mb-2"
              >
                <p className="mb-2">
                  {bet.betValue} pontos apostados na opção <b>{bet.options}</b>
                </p>
                <div
                  className={`py-2 w-full flex flex-col items-center justify-center rounded-md w-full font-bold ${betContainerColor}`}
                >
                  <h5 className="">
                    Retorno de{" "}
                    {(Number(bet.betValue) * bet.oddValue).toFixed(2)} (odd de{" "}
                    {bet.oddValue})
                  </h5>
                  <h4>{label}</h4>
                </div>
              </div>
            );
          })}
          <button
            className="btn-primary mt-4"
            onClick={() => setShowForm(true)}
          >
            Nova Aposta
          </button>
        </>
      );
    }

    return (
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
                className={`py-2 w-full flex flex-col items-center justify-center rounded-md w-full font-bold ${winOddColor}`}
                onClick={() => {
                  setValue("selectedOdd", "winOdd");
                  setValue("oddValue", winOdd.value);
                }}
              >
                <h5 className="mb-1">{winOdd.value}</h5>
                <h4>{winOdd.label}</h4>
              </div>
              <div
                className={`p-1 w-full flex flex-col items-center justify-center rounded-md w-full font-bold ${loseOddColor}`}
                onClick={() => {
                  setValue("selectedOdd", "loseOdd");
                  setValue("oddValue", loseOdd.value);
                }}
              >
                <h5 className="mb-1">{loseOdd.value}</h5>
                <h4>{loseOdd.label}</h4>
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
    );
  };

  return (
    <Modal modalID={modalID}>
      <h2 className="mb-4">{name}</h2>
      <ShowBets />
    </Modal>
  );
}
