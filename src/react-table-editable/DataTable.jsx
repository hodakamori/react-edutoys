import React from "react";
import { useTable } from "react-table";
import { columns, data } from "./tableData";
import { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import "./datatable.css";

const EditableCell = ({
    cell: { value: initialValue },
    row: { index },
    column: { id },
    updateMyData 
  }) => {
    const [value, setValue] = useState(initialValue);
    const onChange = e => {
      setValue(e.target.value);
    };
    const onBlur = () => {
      updateMyData(index, id, value);
    };
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
    return <input value={value} onChange={onChange} onBlur={onBlur} />;
  };

function DataTable() {
  const defaultColumn = {
        Cell: EditableCell
      };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
    defaultColumn,
});

  return (
      <Table {...getTableProps()} striped celled collapsing className="datatable">
          {headerGroups.map((headerGroup) => (
          <Table.Header>
            <Table.Row {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Table.HeaderCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          ))}

        <Table.Body {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Table.Row {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Table.Cell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </Table.Cell>
                  )
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
}

export default DataTable;