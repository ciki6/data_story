// import Handsontable from "handsontable";
import { HotTable } from "@handsontable/react";
import "handsontable/styles/handsontable.css";
import "handsontable/styles/ht-theme-main.css";

import { useRef } from "react";
import type { FC } from "react";

interface DataTableProps {
  data: any[][];
}

export interface ColumnType {
  title: string;
  dataIndex: string;
  key: string;
  width?: number;
  alias?: string;
}

const DataTable: FC<DataTableProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // const [columnTypes, setColumnTypes] = useState<Record<string, string>>({});

  // const typeColors: Record<string, any> = {
  //   number: { badge: "#9780bf", background: "#d2c6e6", text: "123" },
  //   string: { badge: "#e3b2c2", background: "#fedee7", text: "ABC" },
  //   unknown: { badge: "#f5f5f5", background: "#f5f5f5", text: "unknown" },
  // };

  // function isNumeric(str: string): boolean {
  //   if (typeof str !== "string") return false;
  //   return !isNaN(str as any) && !isNaN(parseFloat(str)) && Number(str).toString() === str.trim();
  // }

  // const detectColumnDataType = (key: string) => {
  //   const sampleValue = rows[0]?.[key];
  //   if (isNumeric(sampleValue as string)) {
  //     return "number";
  //   }
  //   if (typeof sampleValue === "string") {
  //     return "string";
  //   }
  //   return "unknown";
  // };

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        minHeight: "400px",
        overflow: "auto",
        position: "relative",
        flex: 1,
      }}
    >
      <HotTable
        data={data}
        colHeaders={true}
        rowHeaders={true}
        // height="100%"
        // width="100%"
        licenseKey="non-commercial-and-evaluation"
        manualRowResize={true}
        manualColumnResize={true}
        manualColumnMove={false}
        rowHeights={33}
        stretchH="all"
        fixedRowsTop={1}
        minRows={10}
        search={true}
        selectionMode="range"
        renderAllRows={false}
        // contextMenu={true}
        // manualRowMove={true}
        // manualColumnMove={true}
        // autoWrapRow={true}
        // multiColumnSorting={true}
        // filters={true}
        // dropdownMenu={true}
        // afterRender={console.log}
        // beforeRenderer={(TD) => {
        //   TD.style.whiteSpace = "nowrap";
        //   TD.style.textOverflow = "ellipsis";
        // }}
        // viewportRowRenderingOffset="auto"
        // renderAllRows={false}
      />
    </div>
  );
};

export default DataTable;
