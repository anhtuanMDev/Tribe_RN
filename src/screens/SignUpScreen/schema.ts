import { z } from 'zod'

export const signUpSchema = z.object({
    email: z.email('Invalid email'),
    username: z.string()
        .min(1, 'Username is required')
        .min(3, 'Username must be at least 3 characters'),
    password: z.string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters'),
})
