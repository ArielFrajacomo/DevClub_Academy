import ThemeToggler from "../ui/ToggleTheme";
import { useState } from "react";

/*
* @param {string} activeTab - the currently active tab name
* @param {function} setActiveTab - function to set the active tab
*/
export default function Navbar() {
  // TODO, discovered some libraries like react-router-dom have a built-in way to handle active links. 
  // For now, i'll keep this implementation while i'm studying more about it.

  const [activeTab, setActiveTab] = useState('home');

  const tabList = {
    home: 'Home',
    search: 'Search',
    list: 'Users List'
  }

  return (
    <div className="group absolute top-0 w-full h-16 background-color-alt text-primary flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">DevClub - React</h1>
      <div className="gap-4 hidden group-hover:flex items-center justify-center">
        { Object.keys(tabList).map(key => (
          <a
            key={key}
            href="#"
            className={`nav-link${activeTab === key ? ' active text-yellow-400' : ''}`}
            onClick={e => {
              e.preventDefault();
              setActiveTab(key);
            }}
            data-tab={key}
          >
            {tabList[key]}
          </a>
        ))}
      </div>
      <ThemeToggler />
    </div>
  );
}

