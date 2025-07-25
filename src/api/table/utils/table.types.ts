export type GetTableType = {
  id: number;
  name: string;
  code: number;
  date: Date;
};

export type SortOrderType = 'ascend' | 'descend';
export type SortFieldType = keyof GetTableType;
