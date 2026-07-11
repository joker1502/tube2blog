"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  videoId: z.string(),
  url: z.string().url(),
  title: z.string().min(1),
  content: z.string().min(1),
});

export async function createPost(formData: FormData) {
  const parsed = schema.parse({
    videoId: formData.get("videoId"),
    url: formData.get("url"),
    title: formData.get("title"),
    content: formData.get("content"),
  });

  const post = await prisma.blogPost.create({
    data: {
      userId: parsed.videoId,
      videoId: parsed.videoId,
      title: parsed.title,
      content: parsed.content,
      status: "PUBLISHED",
    },
  });

  return { id: post.id };
}
