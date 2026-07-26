"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { navItems } from "@/lib/nav-items";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("menu")}
            className="md:hidden"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{t("menu")}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 pb-4">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <SheetClose
                key={item.href}
                render={
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                      active
                        ? "bg-secondary text-secondary-foreground"
                        : "text-foreground hover:bg-muted",
                    )}
                  />
                }
              >
                {t(item.labelKey)}
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
