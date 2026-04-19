import Link from 'next/link';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-glow',
  secondary: 'bg-white/8 text-white hover:bg-white/12 border border-white/10',
  ghost: 'bg-transparent text-slate-200 hover:bg-white/8',
  outline: 'border border-white/15 bg-transparent text-white hover:bg-white/8'
};

type Common = {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

export function Button({
  children,
  variant = 'default',
  className,
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = 'default',
  className,
  href,
  ...props
}: Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  return (
    <Link
      href={href as never}
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
