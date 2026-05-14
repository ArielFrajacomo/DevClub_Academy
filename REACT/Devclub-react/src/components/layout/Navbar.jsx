import NavToggles from "../ui/NavToggles";
import { NavLink } from "react-router-dom";
import { cn } from '../../lib/Utils';
/*
* @param {string} activeTab - the currently active tab name
* @param {function} setActiveTab - function to set the active tab
*/
export default function Navbar({ language, setLanguage }) {

  const navBar = [
    { key: 'home',
      path: {en_US: '/', pt_BR: '/'},
      name: {en_US: 'Home', pt_BR: 'Início'}
    },
    { key: 'search', 
      path: {en_US: '/search', pt_BR: '/buscar'}, 
      name: {en_US: 'Search', pt_BR: 'Buscar'}
    },
    { key: 'list', 
      path: {en_US: '/list-of-users', pt_BR: '/lista-de-usuarios'}, name: 
      {en_US: 'Users List', pt_BR: 'Lista de Usuários'}
    }
  ];

  const classDefaults = cn(
    'absolute top-0 h-12 flex items-center',
    'text-gray-700 hover:text-gray-900 focus:text-gray-900',              //light mode
    'dark:text-gray-300 dark:hover:text-white dark:focus:text-white'      //dark mode
  );

  return (
    <div className= {cn(classDefaults, "group w-full rounded-l-2xl m-1.5 bg-blue-700/5 backdrop-blur-sm")}>
      <h1 className= {cn(classDefaults, "left-2 text-xl font-bold")}>DevClub - React</h1>
      {/* position center */}
      <div className={cn(classDefaults, 
                      "left-1/2 -translate-x-1/2 gap-5 transition-opacity duration-500 ease-in-out",
                      "top-14 flex w-full justify-center rounded-lg bg-blue-700/10 backdrop-blur-sm p-2",
                      "sm:top-0 sm:opacity-0 sm:pointer-events-none",
                      "sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto sm:group-hover:translate-y-0"
                      )}>
        { navBar.map(tab => (
          <NavLink
            key={tab.key}
            to={tab.path[language]}
            end={tab.path[language] === '/'}
            className={cn(
              'text-sm font-medium rounded-md px-3 py-2 transition-colors duration-300 ease-in-out',
              'focus:bg-blue-700/10 outline-none focus:border-b-2 focus:border-blue-500 focus:ring-offset-gray-800',
              'text-gray-700 hover:text-gray-900 focus:text-gray-900',              //light mode
              'dark:text-gray-300 dark:hover:text-white dark:focus:text-white'      //dark mode
            )}
            data-tab={tab.key}
          >
            {tab.name[language]}
          </NavLink>
        ))}
      </div>
      <NavToggles className={cn("right-6", classDefaults)} language={language} setLanguage={setLanguage} />
    </div>
  );
}

