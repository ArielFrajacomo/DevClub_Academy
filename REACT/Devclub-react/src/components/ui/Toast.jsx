
import { cn } from '../../lib/Utils';
import Button from "./Button.jsx";
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Toast component displays a temporary message on the screen.
 * @param {'success'|'warning'|'error'|'system'|'info'|'confirmation'} [type='info'] - The type of toast.
 * @param {string} message - The message to display in the toast.
 * @param {boolean} visible - Whether the toast is visible.
 * @param {function} onConfirm - (Optional) Function to call when the user confirms an action.
 * @param {function} onCancel - (Optional) Function to call when the user cancels an action.
 * @param {'topRight'|'topLeft'|'bottomRight'|'bottomLeft'|'center'} [position='topRight'] - (Optional) Position of the toast on the screen.
 * @param {number} [autoCloseDuration=3000] - (Optional) Time in milliseconds before auto-closing. Only applies to non-info/confirmation types.
 */
export default function Toast({ type = 'info', message = '', visible = true, onConfirm = null, onCancel = null, position = 'topRight', autoCloseDuration = 3000, language = 'en_US' }) {
    if (!visible) return null;
    
    // Auto-close for non-info/confirmation toasts
    useEffect(() => {
        if (visible && type !== 'info' && type !== 'confirmation') {
            const timer = setTimeout(() => {
                onCancel?.();
            }, autoCloseDuration);

            return () => clearTimeout(timer);
        }
    }, [visible, type, autoCloseDuration, onCancel]);

    const toastType = {
        success: 'border-green-500 bg-emerald-950/30 shadow-emerald-500 shadow-lg text-white',
        error: 'border-red-500 bg-red-950/30 shadow-red-500 shadow-lg text-white',
        warning: 'border-yellow-500 bg-yellow-950/30 shadow-yellow-500/40 shadow-lg text-yellow-500',
        system: 'dark:border-gray-500 dark:bg-gray-950/30 dark:shadow-gray-500 shadow-lg dark:text-white text-gray-900 border-gray-300 bg-gray-100 shadow-gray-300',
        info: 'border-blue-500 bg-blue-950/30 shadow-blue-500 shadow-lg text-white',
        confirmation: 'border-gray-500 bg-gray-950/70 shadow-gray-500 shadow-lg text-white'
    }
    const ToastPosition = {
        topRight: 'top-32 right-4 md:top-16',
        topLeft: 'top-32 left-4 md:top-16',
        bottomRight: 'bottom-4 right-4',
        bottomLeft: 'bottom-4 left-4',
        center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    }

    const dict = {
        en_US: {
            confirmButton: 'Confirm',
            cancelButton: 'Cancel'
        },
        pt_BR: {
            confirmButton: 'Confirmar',
            cancelButton: 'Cancelar'
        }
    }

    const toastMarkup = (
        <>
            {/* Blurred backdrop - only behind the toast */}
            {(type === 'confirmation') && <div 
                className="fixed inset-0 backdrop-blur-xs bg-black/20 z-40" 
                onClick={onCancel}
            />}
            
            {/* Toast content - sharp and clear on top */}
            <div className={cn(
                'fixed z-50 max-w-sm border-2 font-light backdrop-blur-md',
                type === 'confirmation' ? ToastPosition['center'] : ToastPosition[position],
                'p-4 rounded-lg flex flex-col gap-2 items-center justify-center',
                toastType[type]
            )}>
                <div className='text-lg'>{message}</div>
                {(type === 'confirmation' || type === 'info') && <div className="flex gap-2 items-center justify-center">
                    <Button onClick={() => onConfirm?.()}>{dict[language].confirmButton}</Button>
                    {type === 'confirmation' && <Button onClick={() => onCancel?.()}>{dict[language].cancelButton}</Button>}
                </div>}
            </div>
        </>
    );

    return createPortal(toastMarkup, document.body);
}