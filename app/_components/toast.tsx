"use client";

import * as RadixToast from "@radix-ui/react-toast";

import { useToastStore } from "../_stores/toast";

export interface ToastProps {
  isOpen: boolean;
  description: string;
  title?: string;
  variant?: "success" | "error";
}

export const Toast = () => {
  const { toast, setIsOpen } = useToastStore((state) => state);
  const { description, isOpen, title, variant } = toast;

  const styleByVariant =
    variant === "success" ? "bg-success-600" : "bg-error-600";

  return (
    <RadixToast.Provider>
      <RadixToast.Root
        className={`p-4 rounded-md toast ${styleByVariant}`}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        {!!title && <RadixToast.Title>{title}</RadixToast.Title>}
        <RadixToast.Description>{description}</RadixToast.Description>
        <RadixToast.Action className="absolute" altText="a"></RadixToast.Action>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-4 right-4 z-10" />
    </RadixToast.Provider>
  );
};
