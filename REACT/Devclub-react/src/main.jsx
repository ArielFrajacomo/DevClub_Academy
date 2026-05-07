import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Home from './pages/Home.jsx'
import Navbar from './components/layout/Navbar.jsx'
import UserSearch from './pages/UserSearch.jsx'
// import UserList from './pages/UserList.jsx'

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { label: 'Home', value: 'home' },
    { label: 'Search', value: 'search' },
    // { label: 'User List', value: 'list' }
  ];

  let content;
  switch (activeTab) {
    case 'home':
      content = <Home />;
      break;
    case 'search':
      content = <UserSearch />;
      break;
    // case 'edit':
    //   content = <UserEdit />;
    //   break;
    // case 'list':
    //   content = <UserList />;
    //   break;
    default:
      content = <div>Not Found</div>;
  }

  return (
    <div className='flex flex-col'>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <div id='menu' className='h-screen w-full flex items-center justify-center'>
        {content}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)