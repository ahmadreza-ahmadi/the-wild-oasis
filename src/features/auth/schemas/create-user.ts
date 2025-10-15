import z from 'zod';

export const createUserSchema = z
  .object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z
      .string()
      .min(1, 'Passowrd is required')
      .min(8, 'Password must be at least 8 characters'),
    repeatPassword: z.string().min(1, 'Repeat password is required'),
  })
  .refine((values) => values.password === values.repeatPassword, {
    error: 'Password and repeat password are different',
    path: ['repeatPassword'],
  });
