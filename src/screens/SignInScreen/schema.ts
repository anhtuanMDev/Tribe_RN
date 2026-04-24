import { z } from 'zod'

export const signInSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters'),
})