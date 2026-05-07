import ThemeToggler from "../ui/ToggleTheme";
import { useState } from "react";

/*
* @param {string} activeTab - the currently active tab name
* @param {function} setActiveTab - function to set the active tab
* @param {object} tabs - object of tab components with keys as tab names
*/
export default function Navbar({ activeTab, setActiveTab, tabs }) {

  console.log(tabs);
  console.log(Object.keys(tabs));

  return (
    <div className="group absolute top-0 w-full h-16 background-color-alt text-primary flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">DevClub - React</h1>
      <div className="gap-4 hidden group-hover:flex items-center justify-center">
        { Object.keys(tabs).map(key => (
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
            {key}
          </a>
        ))}
      </div>
      <ThemeToggler />
    </div>
  );
}

