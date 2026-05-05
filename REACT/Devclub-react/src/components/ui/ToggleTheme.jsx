import { useState } from "react";

export default function ThemeToggler() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <button onClick={toggleTheme} className="p-2 rounded bg-gray-200 dark:bg-gray-700">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
}