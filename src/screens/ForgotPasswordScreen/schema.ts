import { z } from 'zod'

export const forgotPasswordSchema = z.object({
    email: z.email('Invalid email'),
    code: z.string().min(1, 'Code is required').length(6, 'Code must be 6 digits'),
})