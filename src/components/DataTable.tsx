// import Handsontable from "handsontable";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
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
