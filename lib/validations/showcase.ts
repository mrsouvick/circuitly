import { z } from 'zod';
import { ComponentSchema } from './tutorial';

export const ShowcaseFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  image_url: z.string().url('A valid project photograph URL is required'),
  code: z.string().optional(),
  components: z.array(ComponentSchema).default([]),
});

export const CommentFormSchema = z.object({
  content: z.string().min(2, 'Comment must not be empty').max(1000, 'Comment too long'),
  parent_id: z.string().uuid().optional().nullable(),
});

export type ShowcaseFormData = z.infer<typeof ShowcaseFormSchema>;
export type CommentFormData = z.infer<typeof CommentFormSchema>;
