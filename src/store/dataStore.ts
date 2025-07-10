import { create } from "zustand";

interface DataState {
  currentTab: string;
  tableData: Record<string, unknown>[];
  chartType: "line" | "bar";
  setTab: (tab: string) => void;
  setTableData: (data: Record<string, unknown>[]) => void;
  setChartType: (type: "line" | "bar") => void;
  // updateConfig: (config: Partial<{ width: number; height: number }>) => void;
}

export const useDataStore = create<DataState>((set) => ({
  currentTab: "upload",
  tableData: [],
  chartType: "line",

  setTab: (tab) => set({ currentTab: tab }),
  setTableData: () => set((state) => ({ tableData: state.tableData })),
  setChartType: (type) => set({ chartType: type }),
}));
