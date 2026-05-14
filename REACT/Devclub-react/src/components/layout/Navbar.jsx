import NavToggles from "../ui/NavToggles";
import { NavLink } from "react-router-dom";
import { cn } from '../../lib/Utils';
/*
* @param {string} activeTab - the currently active tab name
* @param {function} setActiveTab - function to set the active tab
*/
export default function Navbar({ language, setLanguage }) {

  const navBar = [
    { key: 'home', path: '/' , name: {en_US: 'Home', pt_BR: 'Início'} },
    { key: 'search', path: '/search', name: {en_US: 'Search', pt_BR: 'Buscar'} },
    { key: 'list', path: '/list', name: {en_US: 'Users List', pt_BR: 'Lista de Usuários'} }
  ];

  const classDefaults = cn(
    'absolute top-0 h-12',
    'text-gray-700 hover:text-gray-900 focus:text-gray-900',              //light mode
    'dark:text-gray-300 dark:hover:text-white dark:focus:text-white'      //dark mode
  );

  return (
    <div className= {cn("group absolute w-full rounded-2xl m-1.5 bg-blue-700/5 backdrop-blur-sm", classDefaults)}>
      <h1 className= {cn(`absolute left-2 flex items-center text-xl font-bold`, classDefaults)}>DevClub - React</h1>
      <div className="col-span-3 gap-5 hidden group-hover:flex sm:group-hover:flex-cols items-center justify-center">
        { navBar.map(tab => (
          <NavLink
            key={tab.key}
            to={tab.path}
            end={tab.path === '/'}
            className={({ isActive }) => `nav-link${isActive ? ' active text-yellow-400' : ''}`}
            data-tab={tab.key}
          >
            {tab.name[language]}
          </NavLink>
        ))}
      </div>
      <NavToggles className="col-span-1" language={language} setLanguage={setLanguage} />
    </div>
  );
}

