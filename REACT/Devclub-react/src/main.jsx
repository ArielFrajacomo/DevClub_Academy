import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Home from './pages/Home.jsx'
import Navbar from './components/layout/Navbar.jsx'
import UserSearch from './pages/UserSearch.jsx'
// import UserList from './pages/UserList.jsx'

function App() {

  // TODO - content of a carousel, it will be animated, it will replace tabs[activeTab]
  const tabs = {
    home: <Home />,
    search: <UserSearch />,
    // edit: <UserEdit />,
    // list: <UserList />
  };
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className='flex flex-col'>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
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