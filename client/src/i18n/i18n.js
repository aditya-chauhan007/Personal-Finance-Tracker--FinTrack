import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import hi from "./translations/hi.json";
import bn from "./translations/bn.json";
import te from "./translations/te.json";
import mr from "./translations/mr.json";
import ta from "./translations/ta.json";
import gu from "./translations/gu.json";
import kn from "./translations/kn.json";
import ml from "./translations/ml.json";
import pa from "./translations/pa.json";

i18n.use(LanguageDetector).use(initReactI18next).init({ resources: { en: { translation: en }, hi: { translation: hi }, bn: { translation: bn }, te: { translation: te }, mr: { translation: mr }, ta: { translation: ta }, gu: { translation: gu }, kn: { translation: kn }, ml: { translation: ml }, pa: { translation: pa } }, fallbackLng: "en", lng: localStorage.getItem("fintrack_language") || "hi", interpolation: { escapeValue: false } });
export default i18n;
