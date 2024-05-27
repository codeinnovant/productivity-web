import { z } from "zod";

export const editPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string(),
  categoryId: z.string().min(1, { message: "Category is required" }),
  published: z.boolean()
});

export type EditPostForm = z.infer<typeof editPostSchema>;

/*
  export const addPasswordSchema = z
    .object({
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string(),
    })
    .refine(
        (data) => {
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
                data.password,
            );
        }, { path: ["password"], message: "Password must have one uppercase letter, one number, and one special character." },
    )
    .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords must match." });
    */
