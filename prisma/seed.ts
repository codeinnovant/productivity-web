import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Tech" },
      { name: "Business" },
      { name: "Science" },
      { name: "Sports" }
    ]
  });

  const categories = await prisma.category.findMany();

  const posts = await prisma.post.createMany({
    data: [
      {
        title: "Post 1",
        content: "Content 1",
        categoryId: categories[0].id
      },
      {
        title: "Post 2",
        content: "Content 2",
        categoryId: categories[1].id
      },
      {
        title: "Post 3",
        content: "Content 3",
        categoryId: categories[2].id
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
