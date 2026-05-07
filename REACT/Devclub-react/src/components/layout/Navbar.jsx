import ThemeToggler from "../ui/ToggleTheme";
import { useState } from "react";

/*
* @param {string} activeTab - the currently active tab name
* @param {function} setActiveTab - function to set the active tab
*/
export default function Navbar({ activeTab, setActiveTab }) {
  // i was researching about the new line of thought of react, and it seems that having the tab list being 
  // generated from the tabs object is not a good idea, because it will cause unnecessary re-renders, so 
  // it is better to create a separate object instead

  const tabList = {
    home: 'Home',
    search: 'Search',
    // edit: 'Edit',
    // list: 'List'
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

