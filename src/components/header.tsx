import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="p-4 text-2xl font-bold">Dashboard</h1>
      <Button className="rounded bg-blue-600 px-4 text-white">Download</Button>
    </header>
  );
}
