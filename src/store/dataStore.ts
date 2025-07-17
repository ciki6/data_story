import { create } from "zustand";
import Handsontable from "handsontable";
interface DataState {
  currentTab: string;
  tableData: any[][];
  chartType: string;
  setTab: (tab: string) => void;
  setTableData: (data: any[][]) => void;
  setChartType: (type: string) => void;
}

export const useDataStore = create<DataState>((set) => ({
  currentTab: "upload",
  tableData: Handsontable.helper.createEmptySpreadsheetData(6, 10),
  chartType: "line",

  setTab: (tab) => set({ currentTab: tab }),
  setTableData: (data) => set({ tableData: [...data] }),
  setChartType: (type) => set({ chartType: type }),
}));
