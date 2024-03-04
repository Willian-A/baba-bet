"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { loginSchema, LoginSchemaType } from "./schemas/login";
import { useToastStore } from "../_stores/toast";
import { errorType } from "../_types/error";
import { Spinner } from "../_components/Spinner";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const setToastProps = useToastStore((state) => state).setToastProps;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const submitData = async (data: LoginSchemaType) => {
    setIsLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setIsLoading(false);
      const errorResponse: errorType = await res.json();
      if (res.status === 400) {
        return errorResponse?.map((error) => {
          setError(error.field as keyof LoginSchemaType, {
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
    return router.push("/home");
  };

  return (
    <main className="flex w-[300px] flex-col card">
      <h2 className="mb-4 mt-2 text-center">Login</h2>
      <form onSubmit={handleSubmit((d) => submitData(d))}>
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
        <Link className="block text-right w-full mb-4" href="/cadastro">
          Não tem cadastro? Clique aqui!
        </Link>
        <button className="btn-primary" type="submit">
          {isLoading ? <Spinner /> : "Cadastrar-se"}
        </button>
      </form>
    </main>
  );
}
