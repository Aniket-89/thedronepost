import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-heading font-semibold transition-all duration-150";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    secondary: "bg-bg-dark text-white hover:bg-gray-800",
    outline:
      "border border-border text-text hover:border-accent hover:text-accent",
    dark: "bg-bg-dark text-white hover:bg-gray-900 border border-gray-700",
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-sm px-6 py-2.5",
    lg: "text-base px-8 py-3",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
