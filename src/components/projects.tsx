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
import { Progress } from "@/components/ui/progress";

type Project = {
  title: string;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  description: string;
};

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      title: "Project Alpha",
      status: "In Progress",
      progress: 50,
      startDate: "2023-01-10",
      endDate: "2023-06-30",
      description: "Developing the new alpha feature set."
    },
    {
      title: "Project Beta",
      status: "Completed",
      progress: 100,
      startDate: "2022-05-15",
      endDate: "2022-12-20",
      description: "Beta testing and bug fixes."
    },
    {
      title: "Project Gamma",
      status: "Not Started",
      progress: 0,
      startDate: "2024-03-01",
      endDate: "2024-09-30",
      description: "Future project for gamma development."
    }
  ]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center pb-2">
        <CardTitle>Projects</CardTitle>
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
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{project.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {project.description}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="text-xs" variant="outline">
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Progress value={project.progress} className="w-[100px]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
