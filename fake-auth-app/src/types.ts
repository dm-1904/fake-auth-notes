import { z } from "zod";

export const itemSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
});

export type Type = z.infer<typeof itemSchema>;

export type ActiveTab = "all" | "favorited" | "unfavorited" | "createItem";
