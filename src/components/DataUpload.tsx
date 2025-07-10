import { useDataStore } from "../store/dataStore";
import { read, utils } from "xlsx";
import { useState } from "react";
import type { FC } from "react";
import { Table, message } from "antd";
import type { DragEvent } from "react";
import type { ColumnType } from 'antd/es/table';

const DataUpload: FC = () => {
  const setTableData = useDataStore((state) => state.setTableData);
  const tableData = useDataStore((state) => state.tableData);
  const [dragActive, setDragActive] = useState(false);
  const [columns, setColumns] = useState<ColumnType<any>[]>([]);

  // 处理文件拖放
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (!file?.name.match(/\.(xls|xlsx)$/)) {
      message.error("仅支持Excel文件");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const jsonData: Record<string, unknown>[] = utils.sheet_to_json(ws, { raw: false });

        // 动态生成列
        const dynamicColumns: ColumnType<any>[] = [];
        if (jsonData.length > 0) {
          Object.keys(jsonData[0]).forEach((key) => {
            dynamicColumns.push({
              title: key,
              dataIndex: key,
              key: key,
              width: 150,
              render: (value: unknown) => value?.toString() || '—'
            });
          });
        }
        setColumns(dynamicColumns);

        // 生成带唯一key的数据
        const processedData = jsonData.map((item, index) => ({
          ...item,
          key: `row-${index}-${Date.now()}`
        }));

        setTableData(processedData);
      } catch (error) {
        message.error('文件解析失败');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div
      className={`excel-table ${dragActive ? 'drag-active' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <Table
        columns={columns}
        dataSource={tableData}
        bordered
        pagination={false}
        scroll={{ x: 'max-content', y: 500 }}
        footer={() => dragActive ? "释放文件上传数据" : "拖放Excel文件到此区域"}
      />
    </div>
  );
};

export default DataUpload;
