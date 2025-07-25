import { useQuery } from '@tanstack/react-query';
import { getTableRows } from '../../api/table/table.ts';

const useGetTableRows = (page: number) => {
  return useQuery({
    queryKey: ['tableRows', page],
    queryFn: () => getTableRows(page),
  });
};

export { useGetTableRows };
