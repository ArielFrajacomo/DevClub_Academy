
import { cn } from '../../lib/Utils';
import Button from "./Button.jsx";
import { useEffect } from 'react';


/*
* @param {string} type - The type of toast (e.g., 'success', 'error', 'info', 'warning', 'confirmation').
* @param {string} message - The message to display in the toast.
* @param {boolean} visible - Whether the toast is visible.
* @param {function} onConfirm - (Optional) Function to call when the user confirms an action.
* @param {function} onCancel - (Optional) Function to call when the user cancels an action.
* @param {string} position - (Optional) Position of the toast on the screen.
* @param {number} autoCloseDuration - (Optional) Time in milliseconds before auto-closing (default: 3000). Only applies to non-info/confirmation types.
*/
export default function Toast({ type = 'info', message = '', visible = true, onConfirm = null, onCancel = null, position = 'topRight', autoCloseDuration = 3000 }) {
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
        info: 'border-blue-500 bg-blue-950/30 shadow-blue-500 shadow-lg text-white',
        warning: 'border-yellow-500 bg-yellow-950/30 shadow-yellow-500 shadow-lg text-black',
        confirmation: 'border-gray-500 bg-gray-950/70 shadow-gray-500 shadow-lg text-white'
    }
    const ToastPosition = {
        topRight: 'top-4 right-4',
        topLeft: 'top-4 left-4',
        bottomRight: 'bottom-4 right-4',
        bottomLeft: 'bottom-4 left-4',
        center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    }



    return (
        <>
            {/* Blurred backdrop - only behind the toast */}
            {(type === 'confirmation') && <div 
                className="fixed inset-0 backdrop-blur-xs bg-black/20 z-40" 
                onClick={onCancel}
            />}
            
            {/* Toast content - sharp and clear on top */}
            <div className={cn(
                `fixed z-50 max-w-sm border-2`,
                type === 'confirmation' ? ToastPosition['center'] : ToastPosition[position],
                'p-4 rounded-lg flex flex-col gap-2 items-center justify-center',
                toastType[type]
            )}>
                <h3>{message}</h3>
                {(type === 'confirmation' || type === 'info') && <div className="flex gap-2 items-center justify-center">
                    <Button onClick={() => onConfirm?.()}>Confirm</Button>
                    {type === 'confirmation' && <Button onClick={() => onCancel?.()}>Cancel</Button>}
                </div>}
            </div>
        </>
    );
}