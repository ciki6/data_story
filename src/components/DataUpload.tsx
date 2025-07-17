import { useDataStore } from "../store/dataStore";
import { read, utils } from "xlsx";
import { useEffect } from "react";
import type { FC } from "react";
import { message } from "antd";
import DataTable from "./DataTable";
import DataConfigPanel from "./DataBinding";

const DataUpload: FC = () => {
  const setTableData = useDataStore((state) => state.setTableData);
  const tableData = useDataStore((state) => state.tableData);

  // 全局拖放处理
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer && (e.dataTransfer.dropEffect = 'copy');
    };


    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      handleFileDrop(e.dataTransfer?.files?.[0]);
    };

    document.addEventListener("dragover", handleDragOver as any);
    document.addEventListener("drop", handleDrop as any);

    return () => {
      document.removeEventListener("dragover", handleDragOver as any);
      document.removeEventListener("drop", handleDrop as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileDrop = async (file?: File) => {
    if (!file?.name.match(/\.(xls|xlsx)$/i)) {
      message.error("仅支持Excel文件");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const worksheet = utils.sheet_to_json(ws, { header: 1 });
        const twoDArray = worksheet as any[][];
        setTableData(twoDArray);
      } catch (error) {
        message.error(`文件解析失败: ${(error as Error).message}`);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        gap: 16,
        padding: 16
      }}
    >
      <div style={{
        width: '70%',
        height: '100%',
      }}>
        <DataTable data={tableData} />
      </div>
      <div style={{
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }}>
        <DataConfigPanel />
      </div>
    </div>
  );
};

export default DataUpload;
