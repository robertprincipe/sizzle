import { z } from "zod";

export const postPatchSchema = z.object({
    id: z.string().optional(),
    title: z
        .string({ required_error: "El titulo es requerido." })
        .min(3, "El titulo debe tener al menos 3 caracteres.")
        .max(128, "El titulo debe tener menos de 128 caracteres."),
    published: z.boolean(),
    slug: z.string().optional(),
    cover_image: z.any(),
    content: z.any().optional(),
    tags: z
        .array(
            z.object({ name: z.string({ required_error: "El tag es requerido." }) })
        )
        .optional(),
});

export type formPostData = z.infer<typeof postPatchSchema>;