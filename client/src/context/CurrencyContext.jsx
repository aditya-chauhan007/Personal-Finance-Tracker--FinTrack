import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
const CurrencyContext = createContext(null);
const meta = { INR: { locale: "en-IN", currency: "INR", symbol: "₹" }, USD: { locale: "en-US", currency: "USD", symbol: "$" }, EUR: { locale: "de-DE", currency: "EUR", symbol: "€" } };
export const CurrencyProvider = ({ children }) => { const { user } = useAuth(); const [currency, setCurrency] = useState("INR"); useEffect(() => { if (user?.currency) setCurrency(user.currency); }, [user?.currency]); const formatAmount = (number = 0) => new Intl.NumberFormat(meta[currency].locale, { style: "currency", currency }).format(Number(number) || 0); const value = useMemo(() => ({ currency, setCurrency, symbol: meta[currency].symbol, formatAmount }), [currency]); return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>; };
export const useCurrency = () => useContext(CurrencyContext);
