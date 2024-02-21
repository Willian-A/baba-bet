"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { registerSchema, RegisterSchemaType } from "./schemas/register";
import { useToastStore } from "../_stores/toast";
import { useRouter } from "next/navigation";
import { errorType } from "../_types/error";
import { Spinner } from "../_components/spinner";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const setToastProps = useToastStore((state) => state).setToastProps;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const submitData = async (data: RegisterSchemaType) => {
    setIsLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setIsLoading(false);
      const errorResponse: errorType = await res.json();
      if (res.status === 400) {
        return errorResponse?.map((error) => {
          setError(error.field as keyof RegisterSchemaType, {
            message: error.message,
          });
        });
      }

      return setToastProps({
        isOpen: true,
        description: "Houve um erro ao cadastrar, tente novamente mais tarde",
        variant: "error",
      });
    }

    setIsLoading(false);
    setToastProps({
      isOpen: true,
      description: "Cadastrado com sucesso",
      variant: "success",
    });
    return router.push("/login");
  };

  return (
    <main className="flex w-[300px] flex-col card">
      <h2 className="mb-4 mt-2 text-center">Cadastro</h2>
      <form onSubmit={handleSubmit((d) => submitData(d))}>
        <input
          className="mb-1 input"
          placeholder="Usuário"
          {...register("user")}
        />
        <p className="mb-2 px-1 text-error-400">{errors.user?.message}</p>
        <input
          className="mb-1 input"
          placeholder="E-mail"
          {...register("email")}
        />
        <p className="mb-2 px-1 text-error-400">{errors.email?.message}</p>
        <input
          className="mb-1 input"
          placeholder="Senha"
          type="password"
          {...register("password")}
        />
        <p className="mb-2 px-1 text-error-400">{errors.password?.message}</p>
        <Link className="block text-right w-full mb-4" href="/login">
          Já tem cadastro? Clique aqui!
        </Link>
        <button className="btn-primary" type="submit">
          {isLoading ? <Spinner /> : "Cadastrar-se"}
        </button>
      </form>
    </main>
  );
}
