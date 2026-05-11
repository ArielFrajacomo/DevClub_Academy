import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export default function Layout() {
  const [userList, setUserList] = useState([]);

      // initialize user list on page load
      // it will call if the list is empty, waking up the free RENDER.com server
    useEffect(() => {
        if (userList.length === 0) reloadUserList();
    }, [userList.length]);

    // helper functions
    function reloadUserList() {
        api.getAllUsers()
            .then(resp => {
                setUserList(resp.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className='h-screen w-full flex items-center justify-center'>
        <Outlet context={{ userList, setUserList, reloadUserList }}/>
      </main>
    </div>
  );
}