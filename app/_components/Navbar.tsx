"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { SessionData } from "../_types/sessionData";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [meData, setMeData] = useState<SessionData | undefined>();

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
  }, []);

  return (
    <nav className="flex w-full p-4 items-center justify-between border-b-2 border-background-900">
      <MenuRoundedIcon onClick={() => setIsOpen(true)} />
      <div className="flex items-center">
        <h4 className="flex mr-4 items-center">
          Você tem
          <span className="font-bold mx-1">{meData?.points}</span>
          pontos
        </h4>
        <Link href="/perfil">
          <h4>{meData?.username}</h4>
        </Link>
      </div>

      {isOpen && (
        <>
          <div
            className="absolute top-0 left-0 p-4 z-10 backdrop-blur-sm w-full h-full bg-background-transparent"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="flex flex-col absolute top-0 left-0 p-4 z-10 backdrop-blur-sm w-9/12 h-full bg-background-900">
            <span className="w-full font-semibold flex justify-between mb-4">
              <h2>Baba Bet</h2>
              <CloseRoundedIcon />
            </span>
            <Link href="/home">Home</Link>
            <Link
              className="absolute bottom-4 left-4"
              href="/api/login?action=logout"
            >
              Logout
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
