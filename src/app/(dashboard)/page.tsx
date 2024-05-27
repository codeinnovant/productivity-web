import { Chat } from "@/components/chat";
import { Header } from "@/components/layout/header";
import { Notes } from "@/components/notes";
import { Posts } from "@/components/posts";
import { Projects } from "@/components/projects";
import { Tutorials } from "@/components/tutorials";
import prisma from "@/lib/prisma";

async function getData() {
  const data = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      published: true,
      url: true
    }
  });

  return data;
}

export default async function Home() {
  const posts = await getData();

  return (
    <div className="">
      <Header title="Welcome Mehmet 👋" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
        <div className="md:col-span-2">
          <Posts posts={posts} />
        </div>
        <div className="md:col-span-1">
          <Notes notes={[]} />
        </div>
        <div className="md:col-span-1">
          <Chat />
        </div>
        <div className="md:col-span-2">
          <Tutorials />
        </div>
        <div className="md:col-span-2">
          <Projects />
        </div>
      </div>
    </div>
  );
}
