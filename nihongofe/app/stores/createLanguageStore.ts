import languages, { type Language } from "~/utils/languages";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LanguageSlice = {
  language: Language;
  setLanguage: (newLanguage: Language) => void;
};

const VietnameseLanguageIndex = 2;

export const createLanguageSlice: BoundStateCreator<LanguageSlice> = (set) => ({
  language: languages[VietnameseLanguageIndex],
  setLanguage: (newLanguage: Language) => set({ language: newLanguage }),
});
