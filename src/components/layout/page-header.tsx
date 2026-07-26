import { Container } from "./container";
import { cn } from "@/lib/utils";

/**
 * Consistent page intro used by interior routes. Copy is passed in already
 * localized so this stays a pure presentational component.
 */
export function PageHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <section className={cn("border-border/60 border-b py-14 sm:py-20", className)}>
      <Container>
        <h1 className="font-heading text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
