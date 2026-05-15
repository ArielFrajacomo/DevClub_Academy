import { useState, useEffect } from 'react';
import Toast from './Toast';

// External trigger — holds a reference to the mounted component's setter
let _setToast = null;

export const toast = {
    success: (message, options = {}) => toastDefault(message, 'success', options),
    error: (message, options = {}) => toastDefault(message, 'error', options),
    warning: (message, options = {}) => toastDefault(message, 'warning', options),
    system: (message, options = {}) => toastDefault(message, 'system', options),
}

export function toastDefault(message, type = 'system', options = {}) {
    _setToast?.({
        message,
        type,
        position: 'topRight',
        autoCloseDuration: 4000,
        ...options,
    });
}

export default function ToastAlert() {
    const [toastData, setToastData] = useState(null);

    useEffect(() => {
        _setToast = setToastData;
        return () => { _setToast = null; };
    }, []);

    if (!toastData) return null;

    return (
        <Toast
            {...toastData}
            visible={true}
            onCancel={() => setToastData(null)}
        />
    );
}