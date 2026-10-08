import { z } from 'zod';

export const CategoryFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().min(5, 'Description is required'),
  icon: z.string().min(1, 'Icon identifier is required'),
  color: z.string().min(4, 'Color is required'),
  order_index: z.number().int().default(0),
});

export type CategoryFormData = z.infer<typeof CategoryFormSchema>;
