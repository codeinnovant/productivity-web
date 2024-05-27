"use client";
import { Calendar } from "@/components/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Note } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type NotesProps = {
  notes: Note[];
};

export function Notes({ notes }: NotesProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center pb-2">
        <CardTitle>Notes</CardTitle>
        <Button asChild size="sm" className="ml-auto gap-1" variant="link">
          <Link href="/notes">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Calendar />
      </CardContent>
    </Card>
  );
}
