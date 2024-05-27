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
import { Progress } from "@/components/ui/progress";
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

type Tutorial = {
  title: string;
  link: string;
  status: string;
  progress: number;
  category: string;
};

export function Tutorials() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([
    {
      title: "Next.js Basics",
      status: "In Progress",
      progress: 75,
      category: "Web Development",
      link: "https://nextjs.org/learn/basics/create-nextjs-app"
    },
    {
      title: "Advanced Tailwind CSS",
      status: "Completed",
      progress: 100,
      category: "CSS",
      link: "https://tailwindcss.com/docs"
    },
    {
      title: "TypeScript Essentials",
      status: "Not Started",
      progress: 0,
      category: "Programming",
      link: "https://www.typescriptlang.org/docs/"
    }
  ]);

  return (
    <Card className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">
          Tutorials
        </CardTitle>
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
            {tutorials.map((tutorial, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium text-gray-900">
                    {tutorial.title}
                  </div>
                  <div className="truncate text-sm text-muted-foreground">
                    {tutorial.link}
                  </div>
                </TableCell>
                <TableCell>
                  <Progress value={tutorial.progress} className="w-[100px]" />
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{tutorial.category}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
