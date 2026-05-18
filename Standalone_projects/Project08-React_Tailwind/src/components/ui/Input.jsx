import React from 'react';
import { cn } from '@/lib/Utils';


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
    classContainer = '',
    boxSize = 'md',
    usesLabel = false,
    disabled = false,
    required = false,
    placeholder = '',
    onChange,
    value,
    type = 'text',
    ...props
}) {
    const base = 'px-4 py-2 border rounded-lg border';

    const variants = {
        default: cn('focus:border-blue-500 focus:ring focus:ring-opacity-50',
                    'border-gray-900 text-black backdrop-blur-xs focus:ring-cyan-300/50',
                    'dark:border-gray-300 dark:text-gray-100 dark:backdrop-blur-none dark:focus:ring-blue-200'),
        error: cn('border-red-500 text-red-900 dark:text-red-300 focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50')
    };

    const boxSizes = {
        sm: 'w-sm',
        md: 'w-md',
        lg: 'w-lg',
        full: 'w-full'
    };

    return (
        <div className={classContainer}>
            <div className={cn("flex flex-col m-0", boxSizes[boxSize])}>
                {usesLabel && (
                    <label htmlFor={id}>{placeholder}:
                        <span className={cn(
                            "text-xs",
                            required ? "" : "hidden"
                        )}>*</span> </label>
                )}
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
                    type={type}
                    {...props} 
                />
            </div>
        </div>
    );
}