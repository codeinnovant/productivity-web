import { PostTableActions } from "@/app/(dashboard)/posts/post-table-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Category, Post } from "@prisma/client";
import {
  CheckCheck,
  MoreHorizontal,
  Square,
  SquareCheckBig
} from "lucide-react";
import Link from "next/link";

export default function PostTable({
  posts,
  categories
}: {
  posts: (Post & { category: Category })[];
  categories: Category[];
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Publish</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map(post => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="font-medium">
                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                  </div>
                  {post.url && (
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {post.url}
                    </div>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="outline">
                    {post.category.name}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {post.published ? (
                    <SquareCheckBig className="h-4 w-4 text-green-500" />
                  ) : (
                    <Square className="h-4 w-4 text-red-500" />
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {post.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <PostTableActions post={post} categories={categories} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{posts.length}</strong> posts
        </div>
      </CardFooter>
    </Card>
  );
}
