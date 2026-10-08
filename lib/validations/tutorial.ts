import { z } from 'zod';

export const ComponentSchema = z.object({
  name: z.string().min(1, 'Component name is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  price: z.number().min(0, 'Price must be 0 or positive'),
  buy_url: z.string().optional().default(''),
});

export const StepSchema = z.object({
  order: z.number().int().min(1),
  title: z.string().min(1, 'Step title is required'),
  description: z.string().min(1, 'Step description is required'),
  image_url: z.string().url('Must be a valid image URL').or(z.literal('')),
});

export const TroubleshootingSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
});

export const QuizQuestionSchema = z.object({
  question: z.string().min(1, 'Quiz question is required'),
  options: z.array(z.string().min(1, 'Option cannot be empty')).min(2, 'At least 2 options required'),
  correct_answer: z.number().int().min(0),
  explanation: z.string().optional().default(''),
});

export const TutorialFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category_id: z.string().min(1, 'Category is required'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  time_estimate: z.number().int().min(1, 'Time must be at least 1 minute'),
  cost_estimate: z.number().min(0, 'Cost must be 0 or positive'),
  hero_image: z.string().url('Must be a valid hero image URL'),
  circuit_diagram: z.string().url('Must be a valid diagram URL').optional().or(z.literal('')),
  learning_outcomes: z.array(z.string().min(1)).min(1, 'At least one learning outcome is required'),
  prerequisites: z.array(z.string()).default([]),
  components: z.array(ComponentSchema).min(1, 'At least one component is required'),
  code: z.string().min(10, 'Arduino sketch code is required'),
  steps: z.array(StepSchema).min(1, 'At least one step is required'),
  troubleshooting: z.array(TroubleshootingSchema).default([]),
  quiz: z.array(QuizQuestionSchema).default([]),
  is_published: z.boolean().default(true),
});

export type TutorialFormData = z.infer<typeof TutorialFormSchema>;
