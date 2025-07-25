import { Button, Table } from 'antd';
import { useState } from 'react';
import { TableModal } from './components/TableModal/TableModal';
import { useGetTableRows } from '../../hooks/getTableRows/getTableRows';
import { columns } from './utils/constants.ts';
import { createTableRow, updateTableRow } from '../../api/table/table.ts';
import type { GetTableType } from '../../api/table/utils/table.types.ts';

const TablePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<GetTableType | undefined>(undefined);

  const { data, isLoading, error, refetch } = useGetTableRows(page);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No data</p>;

  const [tableRows, total] = data;

  const extendedColumns = [
    ...columns,
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: GetTableType) => (
        <Button
          type="link"
          onClick={() => {
            setSelectedRow(record);
            setIsOpen(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setSelectedRow(undefined);
          setIsOpen(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Create
      </Button>

      <Table
        dataSource={tableRows.map((item) => ({ ...item, key: item.id }))}
        columns={extendedColumns}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: 10,
          onChange: (p) => setPage(p),
          total: total,
        }}
      />

      <TableModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialData={selectedRow}
        onSubmit={async (formData) => {
          if (selectedRow) {
            await updateTableRow(selectedRow.id, formData);
          } else {
            await createTableRow(formData);
          }
          await refetch();
          setIsOpen(false);
          setSelectedRow(undefined);
        }}
      />
    </>
  );
};

export { TablePage };
