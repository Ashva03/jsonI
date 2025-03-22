"use client";

import { useState, useEffect } from "react";

const MAX_HISTORY_ITEMS = 10;
const STORAGE_KEY = "json-viewer-history";

export function useLocalStorage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading history:", error);
    }
  }, []);

  const addToHistory = (item: any) => {
    const newHistory = [item, ...history].slice(0, MAX_HISTORY_ITEMS);
    setHistory(newHistory);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error("Error saving to history:", error);
    }
  };

  return { history, addToHistory };
}