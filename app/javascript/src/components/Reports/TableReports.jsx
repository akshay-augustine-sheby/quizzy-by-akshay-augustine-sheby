import React, { useMemo } from "react";

import { useTable } from "react-table";

const TableReports = ({ reportData }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Quiz Name",
        accessor: "quiz_name", // accessor is the "key" in the data
      },
      {
        Header: "User Name",
        accessor: "user_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Correct Answers",
        accessor: "correct",
      },
      {
        Header: "Incorrect Answers",
        accessor: "incorrect",
      },
    ],
    []
  );
  const data = useMemo(() => reportData, []);
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <table
        {...getTableProps()}
        className="border border-collapse w-full border-black shadow-lg mb-10"
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr
              key={headerGroup.id}
              {...headerGroup.getHeaderGroupProps()}
              className="border border-black"
            >
              {headerGroup.headers.map(column => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  className="border bg-gray-400 border-gray-400 p-2"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody key="" {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                {...row.getRowProps()}
                className="border border-gray-400"
              >
                {row.cells.map(cell => {
                  return (
                    <td
                      key={cell.id}
                      {...cell.getCellProps()}
                      className="border px-3 border-gray-400 font-medium p-3"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default TableReports;
