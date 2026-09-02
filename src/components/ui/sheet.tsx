import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Content> & { side?: "left" | "right" }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70 data-[state=open]:animate-in" />
      <Dialog.Content
        className={cn(
          "fixed inset-y-0 z-50 flex w-[min(100%,20rem)] flex-col bg-surface p-6 shadow-[var(--shadow-border)]",
          side === "right" ? "right-0" : "left-0",
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-sm text-muted hover:text-fg">
          <X className="size-5" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function SheetTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Title>) {
  return <Dialog.Title className={cn("font-serif text-2xl text-fg", className)} {...props} />;
}
