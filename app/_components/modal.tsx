"use client";

import * as Dialog from "@radix-ui/react-dialog";

import { useModalStore } from "../_stores/modal";

interface ModalProps {
  modalID: string;
  children: React.ReactNode;
}

export function Modal({ modalID, children }: ModalProps) {
  const storeModalID = useModalStore((state) => state.modalID);
  const setOpenModalID = useModalStore((state) => state.setOpenModalID);

  return (
    <Dialog.Root
      open={storeModalID === modalID}
      onOpenChange={(value) => value === false && setOpenModalID(null)}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed w-full h-full top-0 left-0 bg-background-transparent" />
        <Dialog.Content>
          <div className="p-4 rounded-md fixed w-11/12 top-1/2 max-w-[300px] left-1/2 bg-background-900 -translate-x-2/4 -translate-y-2/4">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
