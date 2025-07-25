import { Modal, Input, DatePicker, InputNumber, Button, Form } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { type FC, useEffect } from 'react';
import { type CreateTableDto, CreateTableSchema } from '../../../../api/table/utils/table.dto.ts';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialData?: Partial<CreateTableDto>;
  onSubmit: (data: CreateTableDto) => Promise<void>;
};

const TableModal: FC<Props> = ({ isOpen, setIsOpen, initialData, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTableDto>({
    resolver: zodResolver(CreateTableSchema) as any,
    defaultValues: {
      name: '',
      code: 0,
      date: new Date(),
      ...initialData,
    },
  });

  useEffect(() => {
    reset({
      name: initialData?.name ?? '',
      code: initialData?.code ?? 0,
      date: initialData?.date ?? new Date(),
    });
  }, [initialData, reset]);

  const onFinish = async (data: CreateTableDto) => {
    await onSubmit(data);
    reset();
    setIsOpen(false);
  };

  return (
    <Modal
      title={initialData ? 'Edit Table Entry' : 'Create Table Entry'}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Form.Item
          label="Name"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller name="name" control={control} render={({ field }) => <Input {...field} />} />
        </Form.Item>

        <Form.Item
          label="Code"
          validateStatus={errors.code ? 'error' : ''}
          help={errors.code?.message}
        >
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} onKeyDown={(e) => +e.key} style={{ width: '100%' }} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Date"
          validateStatus={errors.date ? 'error' : ''}
          help={errors.date ? (errors.date.message as string) : ''}
        >
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date ? date.toDate() : null)}
                style={{ width: '100%' }}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          {initialData ? (
            <Button type="primary" htmlType="submit" loading={isSubmitting} block>
              Save
            </Button>
          ) : (
            <Button type="primary" htmlType="submit" loading={isSubmitting} block>
              Create
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { TableModal };
