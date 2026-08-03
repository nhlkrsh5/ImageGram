import {z} from "zod";

const userSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(5)
})