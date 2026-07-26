import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <span className="relative size-10 shrink-0">
        <Image
          src="/brand/logo.png"
          alt={SITE.name}
          fill
          sizes="40px"
          className="object-contain"
          priority
        />
      </span>
      <span className="font-heading text-foreground flex flex-col leading-tight">
        <span className="text-lg font-semibold tracking-tight sm:text-xl">
          {SITE.wordmark.primary}
        </span>
        <span className="text-muted-foreground text-[0.65rem] font-normal tracking-[0.2em] uppercase">
          {SITE.wordmark.secondary}
        </span>
      </span>
    </Link>
  );
}
