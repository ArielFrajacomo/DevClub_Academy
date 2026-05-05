import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Button component
 * @param {string} variant - primary | secondary | ghost | danger
 * @param {string} size - sm | md | lg | rounded
 * @param {boolean} isLoading
 * @param {React.ReactNode} children
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  ...props
}) {
  const base = 'font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2 rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50';
  const animation = 'transition-all duration-300 ease-in-out hover:scale-105';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-zinc-800',
    secondary: 'bg-white border border-zinc-300 hover:bg-zinc-50',
    ghost: 'hover:bg-zinc-100',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  const sizes = {
    rounded: 'px-3 rounded-full text-base',
    sm: 'px-3 py-1.5 hover:rounded-lg text-sm',
    md: 'px-5 py-2.5 hover:rounded-lg text-base',
    lg: 'px-12 py-2.5 hover:rounded-lg text-lg'
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], animation, className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
      {children}
    </button>
  );
}