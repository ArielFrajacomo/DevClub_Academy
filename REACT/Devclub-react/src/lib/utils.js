import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/*
Without
    className={`px-4 py-2 ${isActive ? 'bg-black text-white' : 'bg-white'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}

With
    className={cn(
    'px-4 py-2',
    isActive ? 'bg-black text-white' : 'bg-white',
    disabled && 'opacity-50 cursor-not-allowed'
    )}
*/ 
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

