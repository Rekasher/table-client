import { api } from '../api.ts';
import { TableEndPoints } from './utils/table.constants.ts';
import type { CreateTableDto, UpdateTableDto } from './utils/table.dto.ts';
import type { GetTableType } from './utils/table.types.ts';

const createTableRow = async (data: CreateTableDto) => {
  try {
    const link = `${TableEndPoints.CREATE_ROW}`;
    const res = await api.post(link, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getTableRows = async (page: number) => {
  try {
    const link = `${TableEndPoints.GET_ROWS}?page=${page}`;
    const res = await api.get<GetTableType>(link);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const updateTableRow = async (id: number, data: UpdateTableDto) => {
  try {
    const link = `${TableEndPoints.UPDATE_ROW}${id}`;
    const res = await api.patch(link, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteTableRow = async (id: number) => {
  try {
    const link = `${TableEndPoints.DELETE_ROW}${id}`;
    const res = await api.delete(link);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { createTableRow, getTableRows, updateTableRow, deleteTableRow };
