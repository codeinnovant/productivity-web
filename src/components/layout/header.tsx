import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  title: string;
  subtitle?: string;
  backLink?: string;
  children?: React.ReactNode;
};

export function Header({ title, subtitle, backLink, children }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center justify-center gap-6">
        {backLink && (
          <Link href={backLink}>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        )}
        <div className="flex flex-col gap-1">
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </header>
  );
}
