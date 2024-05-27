import PostTable from "@/app/(dashboard)/posts/post-table";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Home } from "lucide-react";
import Link from "next/link";

async function getPosts() {
  const data = await prisma.post.findMany({
    include: {
      category: true
    }
  });
  return data;
}

async function getCategories() {
  const data = await prisma.category.findMany();
  return data;
}

export default async function PostsPage() {
  const posts = await getPosts();
  const categories = await getCategories();

  return (
    <>
      <Header
        title="Posts"
        subtitle="Manage your posts and publish new content"
      >
        <Button variant="default">Create Post</Button>
      </Header>
      <PostTable posts={posts} categories={categories} />
    </>
  );
}
