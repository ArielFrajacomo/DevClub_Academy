import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import Background from './Background.jsx';
import ToastAlert, { toast } from '../ui/ToastAlert.jsx';

const DEFAULT_LANGUAGE = 'pt_BR';
const SUPPORTED_LANGUAGES = ['pt_BR', 'en_US'];
const SUPPORTED_THEMES = ['light', 'dark'];

function mapBrowserLanguageToAppLanguage(languageCode) {
  if (!languageCode) return null;

  const normalized = String(languageCode).toLowerCase();
  if (normalized.startsWith('pt')) return 'pt_BR';
  if (normalized.startsWith('en')) return 'en_US';

  return null;
}

function getBrowserLanguage() {
  if (typeof navigator === 'undefined') return null;

  const browserLanguages = [
    navigator.language,
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
  ];

  for (const browserLanguage of browserLanguages) {
    const mappedLanguage = mapBrowserLanguageToAppLanguage(browserLanguage);
    if (mappedLanguage && SUPPORTED_LANGUAGES.includes(mappedLanguage)) {
      return mappedLanguage;
    }
  }

  return null;
}

function getSavedLanguage() {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('language');
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
      return stored;
    }
  }

  return getBrowserLanguage() ?? DEFAULT_LANGUAGE;
}

function getSavedTheme() {
  if (typeof window === 'undefined') return 'light';

  const stored = window.localStorage.getItem('theme');
  if (stored && SUPPORTED_THEMES.includes(stored)) {
    return stored;
  }

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export default function Layout() {
  const [userList, setUserList] = useState([]);
  const [language, setLanguage] = useState(() => getSavedLanguage()); // default language
  const [theme, setTheme] = useState(() => getSavedTheme());
  const backgroundColors = {
    backgroundColor: '#fff',
    foregroundColor: '#ddd',
    accentColor: '#00f',
    backgroundColorDark: '#000',
    foregroundColorDark: '#010101',
    accentColorDark: '#00f'
  };
  const activeBackgroundColors = theme === 'dark'
    ? {
        backgroundColor: backgroundColors.backgroundColorDark,
        foregroundColor: backgroundColors.foregroundColorDark,
        accentColor: backgroundColors.accentColorDark,
      }
    : {
        backgroundColor: backgroundColors.backgroundColor,
        foregroundColor: backgroundColors.foregroundColor,
        accentColor: backgroundColors.accentColor,
      };
  const dict = {
    en_US: {
      loadingUsers_firstTime: 'Waking up the server...',
      usersLoaded: 'Server is awake and ready to use.',
      usersLoadError: 'Failed to load user list.',
    },
    pt_BR: {
      loadingUsers_firstTime: 'Acordando o servidor...',
      usersLoaded: 'Servidor acordado e pronto para uso.',
      usersLoadError: 'Falha ao carregar a lista de usuários.',
    }
  };

  // initialize user list on page load
  // it will call if the list is empty, waking up the free RENDER.com server
  useEffect(() => {
      if (userList.length !== 0) return;

      async function initializeUserList() {
        try {
          // only show loading toast if the server takes more than 2 seconds to respond, to avoid showing it unnecessarily on fast responses
          let isLoading = true
          setTimeout(() => {
            if (isLoading) {
              toast.system(dict[language].loadingUsers_firstTime);
            }
          }, 2000); // Show warning if loading takes more than 2 seconds

          await reloadUserList();

          isLoading = false;
          toast.success(dict[language].usersLoaded);
        } catch (error) {
          toast.error(dict[language].usersLoadError);
        }
      }

      initializeUserList();
  }, [userList.length]);

  useEffect(() => {
    if (!SUPPORTED_LANGUAGES.includes(language)) return;

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', language);
    }
  }, [language]);

  useEffect(() => {
    if (!SUPPORTED_THEMES.includes(theme)) return;

    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    window.localStorage.setItem('theme', theme);
  }, [theme]);

  // helper functions
  function reloadUserList() {
      return api.getAllUsers()
          .then(resp => {
              setUserList(resp.data);
          return resp.data;
          })
          .catch(error => {
              console.error('Error fetching users:', error);
          throw error;
          });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Background {...activeBackgroundColors} />
      <Navbar language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme}/>
      <ToastAlert />
      <main className='min-h-screen w-full flex items-center justify-center px-4'>
        <Outlet context={{ userList, setUserList, language, reloadUserList }}/>
      </main>
    </div>
  );
}