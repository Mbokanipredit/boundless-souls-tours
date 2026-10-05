"use client";

import { currencyModalData } from "@/data/currency-modal-data";
import Modal from "@/components/modal/modal";
import {
  useCurrencyModal,
  type CurrencyInfo,
} from "@/context/currency-modal-context";
import { useState } from "react";
import { cn } from "@/lib/utils";

function CurrencyModal() {
  const { actions, state } = useCurrencyModal();
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyInfo>(
    state?.content?.currency!
  );

  const handleCurrencyChange = (currency: CurrencyInfo) => {
    actions.setModalContent(currency);
    setSelectedCurrency(currency);
    actions.onClose();
  };

  return (
    <Modal
      title="Select your currency"
      onClose={actions.onClose}
      isOpen={state.isOpen}
    >
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto p-1">
        {currencyModalData.map((currency) => {
          const isSelected = selectedCurrency?.code === currency.code;
          return (
            <li key={currency.code}>
              <button
                className={cn(
                  "w-full flex flex-col items-start p-3 rounded-xl border text-left transition-all",
                  isSelected
                    ? "border-blue-600 bg-blue-50/50 text-blue-900 font-bold shadow-sm"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                )}
                onClick={() => handleCurrencyChange(currency)}
              >
                <span className="text-sm font-semibold">{currency.name}</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">
                  {currency.code} - {currency.sign}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}

export default CurrencyModal;
