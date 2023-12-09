import { z } from "zod";

const User = z.object({
    username: z.string({
        required_error: "User name is required",
    }),
    fullname: z.string({
        required_error: "Full name is required",
    }),
    password: z
        .string({
        required_error: "Passowrd is required",
        })
        .min(8),
    email: z
        .string({
        required_error: "Email is required",
        })
        .email(),
    birthdate: z.date({
        required_error: "Birth date is required",
    }),
    nationality: z.string({
        required_error: "Nationality is required",
    })
});

const validateUser = (userData: any) => User.safeParse(userData);
const validatePartialUser = (userData: any) =>
  User.partial().safeParse(userData);

export { validateUser, validatePartialUser };