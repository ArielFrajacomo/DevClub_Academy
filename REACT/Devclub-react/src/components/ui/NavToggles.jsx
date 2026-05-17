import { cn } from '../../lib/Utils';

export default function NavToggles ({ language, setLanguage, theme, setTheme, className, data }) {
    
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };
    const toggleLanguage = () => {
        const nextLanguage = language === 'en_US' ? 'pt_BR' : 'en_US';

        const matchedTab = data.find(tab => window.location.pathname === tab.path[language]);
        if (matchedTab) {
            window.history.replaceState(null, '', matchedTab.path[nextLanguage]);
        }

        setLanguage(nextLanguage);
    };

    const classDefaults = cn(
        'backdrop-blur-xs focus:outline-hidden', 
        'text-gray-700 focus:bg-gray-100 focus:text-gray-900',              //light mode
        'dark:text-gray-300 dark:focus:bg-white/5 dark:focus:text-white');  //dark mode

    return (
        <div className={cn(className, "gap-2")}>
            <button onClick={toggleTheme} className={`p-2 rounded-full size-10 ${classDefaults}`}>
                {theme === 'light' ? '☀' : '🌙'}
            </button>
            <button onClick={toggleLanguage} className={`p-2 rounded size-10 ${classDefaults}`}>
                {language === 'en_US' ? 'EN' : 'PT'}
            </button>
        </div>
    );
}