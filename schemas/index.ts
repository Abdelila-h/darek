import { UNSTABLE_REVALIDATE_RENAME_ERROR } from 'next/dist/lib/constants';
import * as z from 'zod';

export const ClerkRegister = z.object ({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    username: z.string(),
    image: z.string(),
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum Password Length is 6 characters"
    }),
    name: z.string().min(1, {
        message: "Name is Required"
    }),
}) 


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
}) 

export const PostSchema = z.object({
    title: z.string({
        message: "Title is required"
    }),
    price: z.string({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
    }),
    description: z.string({
        message: "Description is required"
    }),
})

export type DataType = z.infer<typeof PostSchema>;

export const UpdateSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters').optional(),
    confirmPassword: z.string().optional(),
  }).refine((data) => data.newPassword === data.confirmPassword,{
      message: 'Passwords must match',
      path: ['confirmPassword'],
  });

export type formData = z.infer<typeof UpdateSchema>;


