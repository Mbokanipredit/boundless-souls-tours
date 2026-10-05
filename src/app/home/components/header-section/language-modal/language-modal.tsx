"use client";

import Modal from "@/components/modal/modal";
import {
  type LanguageCountryData,
  useLanguageModal,
} from "@/context/language-modal-context";
import { languageModalData } from "@/data/language-modal-data";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

function LanguageModal() {
  const { state, actions } = useLanguageModal();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCountryData>(
    state.content?.language!
  );

  const handleLanguageChange = (language: LanguageCountryData) => {
    actions.setContent(language);
    setSelectedLanguage(language);
  };

  return (
    <Modal
      title="Select your language"
      isOpen={state.isOpen}
      onClose={actions.onClose}
    >
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto p-1">
        {languageModalData.map((language) => {
          const isSelected = selectedLanguage?.code === language.code;
          return (
            <li key={language.code}>
              <button
                className={cn(
                  "w-full flex flex-col items-start p-3 rounded-xl border text-left transition-all",
                  isSelected
                    ? "border-blue-600 bg-blue-50/50 text-blue-900 font-bold shadow-sm"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                )}
                onClick={() => handleLanguageChange(language)}
              >
                <span className="text-sm font-semibold">{language.language}</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">
                  {language.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}

export default LanguageModal;
