import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
export const useTransactions = () => { const [transactions, setTransactions] = useState([]); const [loading, setLoading] = useState(true); const fetchTransactions = useCallback(async () => { setLoading(true); const { data } = await api.get("/api/transactions"); setTransactions(data.transactions || []); setLoading(false); }, []); useEffect(() => { fetchTransactions().catch(() => setLoading(false)); }, [fetchTransactions]); return { transactions, setTransactions, loading, fetchTransactions }; };
