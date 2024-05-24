"use client";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function Home() {
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="mb-4 text-3xl font-bold">Next Template Starter</h1>
        <Button onClick={() => console.log("click")}>
          <Play className="mr-2 h-4 w-4" /> Get Started
        </Button>
      </div>
    </section>
  );
}
