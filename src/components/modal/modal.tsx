"use client";

import React, { ReactNode } from "react";
import { Dialog } from "@/components/ui/dialog";

interface ModalProps {
  children: ReactNode;
  title?: string;
  width?: number;
  height?: number;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, title, isOpen, onClose }: ModalProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title}>
      {children}
    </Dialog>
  );
}

export default Modal;
