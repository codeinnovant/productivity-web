import { Header } from "@/components/header";
import { Links } from "@/components/links";
import { Projects } from "@/components/projects";
import { Tutorials } from "@/components/tutorials";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <Header />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Links />
          <Projects />
          <div className="col-span-2">
            <Tutorials />
          </div>
        </div>
      </div>
    </div>
  );
}
