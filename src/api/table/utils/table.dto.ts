import { z } from 'zod';

export const CreateTableSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.number().int().positive(),
  date: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
});

export const UpdateTableSchema = CreateTableSchema.partial();

export type CreateTableDto = z.infer<typeof CreateTableSchema>;
export type UpdateTableDto = z.infer<typeof UpdateTableSchema>;
