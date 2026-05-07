import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Home from './pages/Home.jsx'
import Navbar from './components/layout/Navbar.jsx'
import UserSearch from './pages/UserSearch.jsx'
// import UserList from './pages/UserList.jsx'

function App() {
  // Hooks must be called at the top level of a component.
  // This is because React relies on the order of Hook calls to associate them with the correct component instance. If you call Hooks conditionally or inside loops, it can lead to unpredictable behavior and bugs in your application.
  const [activeTab, setActiveTab] = useState('home');

  // TODO - content of a carousel, it will be animated, it will replace tabs[activeTab]
  const tabs = {
    home: <Home />
    , search: <UserSearch />
    //, edit: <UserEdit />
    //, list: <UserList />
  };

  return (
    <div className='flex flex-col'>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div id='menu' className='h-screen w-full flex items-center justify-center'>
        {tabs[activeTab]}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)