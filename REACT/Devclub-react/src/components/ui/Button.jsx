import React, { useState } from 'react';
import { cn } from '@/lib/Utils';
import Toast from './Toast.jsx';

/**
 * Button component
 * @param {string} variant - primary | secondary | ghost | danger | transparent
 * @param {string} size - sm | md | lg | rounded
 * @param {boolean} isLoading
 * @param {React.ReactNode} children
 * @param {string} onHover - CSS class for hover state
 * @param {boolean} confirmAction - Whether the button requires confirmation
 * @param {string} confirmMessage - Message to display for confirmation
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  type = 'button',
  onHover = null,
  confirmAction = false,
  confirmMessage = '',
  onClick,
  ...props
}) {
  const [toastVisible, setToastVisible] = useState(false);
  const base = 'font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2 rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50';
  const animation = 'transition-all duration-300 ease-in-out hover:scale-105';
  
  const variants = {
    // [default looks, hover state]
    primary: 
      {Default: 'bg-black text-white', Hover: 'hover:bg-slate-800'},
    secondary: 
      {Default: 'bg-white border border-zinc-300', Hover: 'hover:bg-slate-50'},
    ghost: 
      {Default: '', Hover: 'hover:bg-slate-100'},
    danger: 
      {Default: 'bg-red-600 text-white', Hover: 'hover:bg-red-700'},
    transparent: 
      {Default: 'bg-transparent', Hover: 'hover:bg-slate-100'}
  };

  const sizes = {
    rounded: 'p-2 size-full rounded-full text-base',
    sm: 'px-3 py-1.5 hover:rounded-lg text-sm',
    md: 'px-5 py-2.5 hover:rounded-lg text-base',
    lg: 'px-12 py-2.5 hover:rounded-lg text-lg'
  };

  return (
    <>
      <button
        className={cn(
          base, 
          variants[variant].Default, onHover ?? variants[variant].Hover,
          sizes[size], 
          animation, 
          className)}
        onClick={confirmAction ? () => setToastVisible(true) : onClick}
        disabled={isLoading}
        type={type}
        {...props}
      >
        {isLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
        {children}
      </button>
      {confirmAction && <Toast visible={toastVisible} type="confirmation" message={confirmMessage} onConfirm={() => { onClick?.(); setToastVisible(false); }} onCancel={() => setToastVisible(false)} />}
    </>
  );
}