"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function deletePostAction(postId: string) {
  // Adding a delay of 5 seconds
  // TODO delete this line
  await new Promise(resolve => setTimeout(resolve, 2000));

  await prisma.post.delete({
    where: {
      id: postId
    }
  });
  revalidatePath("/posts");
}
