import ThemeToggler from "../ui/ToggleTheme";
import { NavLink } from "react-router-dom";

/*
* @param {string} activeTab - the currently active tab name
* @param {function} setActiveTab - function to set the active tab
*/
export default function Navbar() {
  // TODO, discovered some libraries like react-router-dom have a built-in way to handle active links. 
  // For now, i'll keep this implementation while i'm studying more about it.

  const navBar = [
    { key: 'home', name: 'Home', path: '/' },
    { key: 'search', name: 'Search', path: '/search' },
    { key: 'list', name: 'Users List', path: '/list' }
  ];


  return (
    <div className="group absolute top-0 w-full h-16 background-color-alt text-primary flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">DevClub - React</h1>
      <div className="gap-4 hidden group-hover:flex items-center justify-center">
        { navBar.map(tab => (
          <NavLink
            key={tab.key}
            to={tab.path}
            end={tab.path === '/'}
            className={({ isActive }) => `nav-link${isActive ? ' active text-yellow-400' : ''}`}
            data-tab={tab.key}
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
      <ThemeToggler />
    </div>
  );
}

