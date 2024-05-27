import { EditPostButton } from "@/app/posts/[id]/edit-post-button";
import { Header } from "@/components/header";
import prisma from "@/lib/prisma";
import Link from "next/link";

async function getData(id: string) {
  const data = await prisma.post.findUnique({
    where: {
      id
    }
  });

  return data;
}

export default async function PostDetailPage({
  params
}: {
  params: { id: string };
}) {
  const post = await getData(params.id);
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        <Header title={post.title} backLink="/posts">
          <EditPostButton post={post} />
        </Header>
        <div className="rounded-lg bg-white p-4 shadow">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}
