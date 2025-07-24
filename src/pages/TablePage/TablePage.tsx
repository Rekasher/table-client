import { Table } from 'antd';

const dataSource = [
  {
    key: 1,
    name: 'Table1',
    dateValue: new Date().toLocaleDateString(),
    numValue: 1,
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Date Value',
    dataIndex: 'dateValue',
    key: 'dateValue',
  },
  {
    title: 'Num Value',
    dataIndex: 'numValue',
    key: 'numValue',
  },
];

const TablePage = () => {
  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export { TablePage };
