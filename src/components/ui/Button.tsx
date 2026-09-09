import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Buttons follow the mockups: Lenia Mono, caps, 2% tracking, square corners.
 * The outlined variant is the one the website uses most; solid is reserved for
 * the single primary action on a screen.
 */
const button = cva(
  "type-button inline-flex items-center justify-center gap-2 border transition-colors duration-(--duration-fast) ease-(--ease-brand) disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "border-maroon bg-maroon text-offwhite hover:bg-chilli hover:border-chilli",
        outline: "border-maroon text-maroon hover:bg-maroon hover:text-offwhite",
        ghost: "border-transparent text-maroon hover:text-chilli",
        /** On maroon or ink grounds. */
        inverse:
          "border-offwhite text-offwhite hover:bg-offwhite hover:text-maroon",
      },
      size: {
        sm: "px-4 py-2",
        md: "px-6 py-3",
        lg: "px-8 py-4",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  },
);

type ButtonProps = VariantProps<typeof button> & {
  children: ReactNode;
  className?: string;
  href?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({
  children,
  className,
  variant,
  size,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(button({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
