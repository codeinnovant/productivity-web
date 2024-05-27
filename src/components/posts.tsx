"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Post } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type PostsProps = {
  posts: Post[];
};

export function Posts({ posts }: PostsProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center pb-2">
        <CardTitle>Posts</CardTitle>
        <Button asChild size="sm" className="ml-auto gap-1" variant="link">
          <Link href="/posts">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={index} className="hover:bg-slate-100">
                <TableCell>
                  <div className="font-medium">
                    <Link
                      href={`/posts/${post.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                    </Link>
                  </div>
                  {post.url && (
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      <Link
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post.url}
                      </Link>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className="text-xs" variant="outline">
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
