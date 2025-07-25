import { useQuery } from '@tanstack/react-query';
import { getTableRows } from '../../api/table/table.ts';
import type { SortFieldType, SortOrderType } from '../../api/table/utils/table.types.ts';

const useGetTableRows = (
  page: number,
  search = '',
  sortField: SortFieldType = 'id',
  sortOrder: SortOrderType = 'ascend',
) => {
  return useQuery({
    queryKey: ['tableRows', page, search, sortField, sortOrder],
    queryFn: () => getTableRows(page, search, sortField, sortOrder),
  });
};

export { useGetTableRows };
