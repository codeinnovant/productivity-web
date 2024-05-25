"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Link = {
  title: string;
  url: string;
  category: string;
};

export function Links() {
  const [links, setLinks] = useState<Link[]>([
    {
      title: "Tailwind CSS",
      url: "https://tailwindcss.com",
      category: "Design"
    },
    {
      title: "Next.js",
      url: "https://nextjs.org",
      category: "Development"
    },
    {
      title: "Vercel",
      url: "https://vercel.com",
      category: "Deployment"
    }
  ]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center pb-2">
        <CardTitle>Links</CardTitle>
        <Button asChild size="sm" className="ml-auto gap-1" variant="link">
          <Link href="#" target="_blank" rel="noopener noreferrer">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {links.map((link, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </Link>
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.url}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="text-xs" variant="outline">
                    {link.category}
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
