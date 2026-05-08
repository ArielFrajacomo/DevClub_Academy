// src/App.jsx
import { useState } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import Home from './pages/Home.jsx';
import UserPage from './pages/UserPage.jsx';
// import UserList from '../pages/UserList.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = {
    home: <Home />,
    search: <UserPage />,
    // list: <UserList />,
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

export default App;