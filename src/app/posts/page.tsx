import PostTable from "@/app/posts/post-table";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Home } from "lucide-react";
import Link from "next/link";

async function getData() {
  const data = await prisma.post.findMany();

  return data;
}

export default async function PostsPage() {
  const posts = await getData();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        <Header
          title="Posts"
          subtitle="Manage your posts and publish new content"
          backLink="/"
        >
          <Button variant="default">Create Post</Button>
        </Header>
        <PostTable posts={posts} />
      </div>
    </div>
  );
}
