import { Button, Input, Table } from 'antd';
import { useState } from 'react';
import { TableModal } from './components/TableModal/TableModal';
import { useGetTableRows } from '../../hooks/useGetTableRows/useGetTableRows.ts';
import { columns, pageSize } from './utils/constants.ts';
import { createTableRow, updateTableRow } from '../../api/table/table.ts';
import type {
  GetTableType,
  SortFieldType,
  SortOrderType,
} from '../../api/table/utils/table.types.ts';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { DeleteRowModal } from './components/DeleteRowModal/DeleteRowModal.tsx';
import type { CreateTableDto } from '../../api/table/utils/table.dto.ts';

import styles from './TablePage.module.css';

const TablePage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [sortField, setSortField] = useState<SortFieldType>('id');
  const [sortOrder, setSortOrder] = useState<SortOrderType>('ascend');

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<GetTableType | undefined>(undefined);

  const { data, isLoading, error, refetch } = useGetTableRows(page, search, sortField, sortOrder);

  if (isLoading) return <div className={styles.centered}>Loading...</div>;
  if (error) return <div className={styles.centered}>Error loading data</div>;
  if (!data) return <div className={styles.centered}>No data</div>;

  const [tableRows, total] = data;

  const createUpdateRow = async (formData: CreateTableDto) => {
    if (selectedRow) {
      await updateTableRow(selectedRow.id, formData);
    } else {
      await createTableRow(formData);
    }
    await refetch();
    setIsOpen(false);
    setSelectedRow(undefined);
  };

  const handleSearch = () => {
    setPage(1);
    setSearch(inputValue);
  };

  const extendedColumns = [
    ...columns,
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: GetTableType) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedRow(record);
              setIsOpen(true);
            }}
            type="link"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              setRowToDelete(record.id);
              setIsDeleteModalOpen(true);
            }}
            type="link"
            danger
          />
        </>
      ),
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Table</h1>
        <div className={styles.headerControls}>
          <Input.Search
            placeholder="Search by any field"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSearch={handleSearch}
            style={{ width: 250, marginRight: 16 }}
            allowClear
          />
          <Button
            type="primary"
            onClick={() => {
              setSelectedRow(undefined);
              setIsOpen(true);
            }}
          >
            Create
          </Button>
        </div>
      </header>

      <main className={styles.tableContainer}>
        <div className={styles.innerTableScroll}>
          <Table
            dataSource={tableRows.map((item) => ({ ...item, key: item.id }))}
            columns={extendedColumns}
            loading={isLoading}
            pagination={{
              current: page,
              pageSize: pageSize,
              onChange: (p) => setPage(p),
              total: total,
            }}
            scroll={{ x: 'max-content' }}
            onChange={(_pagination, _filters, sorter) => {
              if (!Array.isArray(sorter)) {
                setSortField((sorter.field as SortFieldType) ?? 'id');
                setSortOrder((sorter.order as SortOrderType) ?? 'ascend');
              }
            }}
          />
        </div>
      </main>

      <TableModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialData={selectedRow}
        onSubmit={createUpdateRow}
      />

      <DeleteRowModal
        deleteModalOpen={isDeleteModalOpen}
        setDeleteModalOpen={setIsDeleteModalOpen}
        rowToDelete={rowToDelete}
        setRowToDelete={setRowToDelete}
        refetch={refetch}
      />
    </div>
  );
};

export { TablePage };
