import { useEffect } from 'react';
import Toast from './Toast';

export default function ToastAlert({
    type = 'success',
    message = '',
    position = 'topRight',
    autoCloseDuration = 4000,
    visible = false,
}) {
    const [visible, setVisible] = useState(visible);

    useEffect(() => {
        if (!visible) return;

        const timer = setTimeout(() => {
            setVisible(false);
        }, autoCloseDuration);

        return () => clearTimeout(timer);
    }, [visible, autoCloseDuration]);

    return ( 
        <Toast
        type={type}
        message={message}
        visible={visible}
        position={position}
        autoCloseDuration={autoCloseDuration}
        onCancel={onClose}
        />
    );
}