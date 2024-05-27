"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { EditPostForm } from "@/lib/validators/post";

export async function editPostAction(postId: string, data: EditPostForm) {
  await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      title: data.title,
      content: data.content,
      published: data.published,
      categoryId: data.categoryId
    }
  });

  revalidatePath("/posts");
}
