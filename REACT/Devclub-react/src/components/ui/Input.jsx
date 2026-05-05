import React from 'react';
import { cn } from '@/lib/utils';


/**
 * Input component
 * @param {object} props - Props for the input component
 * @param {string} props.className - Additional class names for the input
 * @param {string} props.boxSize - Size of the input box (sm, md, lg, full)
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {boolean} props.required - Whether the input is required
 * @param {string} props.placeholder - Placeholder text for the input
 * @param {function} props.onChange - Change handler for the input
 * @param {string} props.value - Value of the input
 * @returns {JSX.Element} The rendered input component
 */
export default function Input({ 
    id = '',
    className = '',
    boxSize = 'md',
    disabled = false,
    required = false,
    placeholder = '',
    onChange,
    value,
    ...props
}) {
    const base = 'px-4 py-2 border rounded-lg border';

    const variants = {
        default: 'border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50',
        error: 'border-red-500 focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50'
    };

    const boxSizes = {
        sm: 'w-sm',
        md: 'w-md',
        lg: 'w-lg',
        full: 'w-full'
    };

    return (
        <div className={cn("flex flex-col m-0", boxSizes[boxSize])}>
            <label htmlFor={id}>{placeholder}:
                <span className={cn(
                    "text-xs",
                    required ? "" : "hidden"
                )}>*</span> </label>
            <input
                id={id}
                className={cn(
                    base,
                    variants.default,
                    disabled && 'opacity-50 cursor-not-allowed',
                    className
                )}
                disabled={disabled}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                {...props} 
            />
        </div>
    );
}