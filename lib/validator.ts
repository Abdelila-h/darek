import * as z from 'zod'

export const darFormSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters."),
    description: z.string().min(2, "Description must be at least 2 characters.").
                            max(200, "Description must be less than 200 characters."),
    location: z.string().min(2, "Location must be at least 2 characters.").
                         max(200, "Location must be less than 200 characters."),
    imageUrl: z.string(),
    categoryId: z.string(),
    price: z.string(),
    url: z.string().url()
  })

export const userInfoSchema = z.object({
  username: z.string(),
  email: z.string().email(),
})