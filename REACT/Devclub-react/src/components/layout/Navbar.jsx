import ThemeToggler from "../ui/ToggleTheme";
import { useState } from "react";

/*
* @param {string} activeTab - the currently active tab
* @param {function} setActiveTab - function to set the active tab
* @param {array} tabs - array of tab objects with label and value
*/
export default function Navbar({ activeTab, setActiveTab, tabs }) {
  const [localActiveTab, setLocalActiveTab] = useState(activeTab);

  return (
    <div className="group absolute top-0 w-full h-16 background-color-alt text-primary flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">DevClub - React</h1>
      <div className="gap-4 hidden group-hover:flex items-center justify-center">
        {tabs.map(tab => (
          <a
            key={tab.value}
            href="#"
            className={`nav-link${activeTab === tab.value ? ' active text-yellow-400' : ''}`}
            onClick={e => {
              e.preventDefault();
              setActiveTab(tab.value);
            }}
            data-tab={tab.value}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <ThemeToggler />
    </div>
  );
}

