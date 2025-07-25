import { Modal } from 'antd';
import type { FC } from 'react';
import { deleteTableRow } from '../../../../api/table/table.ts';

type DeleteRowModalProps = {
  deleteModalOpen: boolean;
  setDeleteModalOpen: (open: boolean) => void;
  rowToDelete: number | null;
  setRowToDelete: (row: number | null) => void;
  refetch: () => Promise<any>;
};

const DeleteRowModal: FC<DeleteRowModalProps> = ({
  deleteModalOpen,
  setDeleteModalOpen,
  rowToDelete,
  setRowToDelete,
  refetch,
}) => {
  return (
    <Modal
      title="Confirm Delete"
      open={deleteModalOpen}
      onCancel={() => setDeleteModalOpen(false)}
      onOk={async () => {
        if (rowToDelete) {
          await deleteTableRow(rowToDelete);
          await refetch();
        }
        setDeleteModalOpen(false);
        setRowToDelete(null);
      }}
      okText="Yes"
      cancelText="No"
    >
      <p>Are you sure you want to delete this row?</p>
    </Modal>
  );
};

export { DeleteRowModal };
