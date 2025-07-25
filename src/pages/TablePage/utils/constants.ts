export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
  },
  {
    title: 'Date Value',
    dataIndex: 'date',
    key: 'date',
    sorter: true,
    render: (date: string | Date) => {
      const d = new Date(date);
      return isNaN(d.getTime()) ? '' : d.toLocaleDateString();
    },
  },
  {
    title: 'Num Value',
    dataIndex: 'code',
    key: 'code',
    sorter: true,
  },
];

export const pageSize = 7;
