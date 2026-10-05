"use client";
import { CurrencyModalProvider } from "@/context/currency-modal-context";
import { LanguageModalProvider } from "@/context/language-modal-context";
import { StickyNavigationProvider } from "@/context/navigation-sticky-context";
import { DataProvider } from "@/context/data-context";
import { AuthProvider } from "@/context/auth-context";
import React, { PropsWithChildren } from "react";

function Provider({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <DataProvider>
        <StickyNavigationProvider>
          <LanguageModalProvider>
            <CurrencyModalProvider>{children}</CurrencyModalProvider>
          </LanguageModalProvider>
        </StickyNavigationProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default Provider;
