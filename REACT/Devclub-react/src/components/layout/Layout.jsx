import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import Background from './Background.jsx';
import ToastAlert, { toast } from '../ui/ToastAlert.jsx';

export default function Layout() {
  const [userList, setUserList] = useState([]);
  const [language, setLanguage] = useState('pt_BR'); // default language
  const backgroundColors = {
    backgroundColor: '#000',
    foregroundColor: '#010101',
    accentColor: '#00f',
  };
  const dict = {
    en_US: {
      loadingUsers_firstTime: 'Waking up the server...',
      usersLoaded: 'User list loaded.',
      usersLoadError: 'Failed to load user list.',
    },
    pt_BR: {
      loadingUsers_firstTime: 'Acordando o servidor...',
      usersLoaded: 'Lista de usuários carregada.',
      usersLoadError: 'Falha ao carregar a lista de usuários.',
    }
  };

  // initialize user list on page load
  // it will call if the list is empty, waking up the free RENDER.com server
  useEffect(() => {
      if (userList.length !== 0) return;

      async function initializeUserList() {
        toast.system(dict[language].loadingUsers_firstTime);

        try {
          await reloadUserList();
          toast.success(dict[language].usersLoaded);
        } catch (error) {
          toast.error(dict[language].usersLoadError);
        }
      }

      initializeUserList();
  }, [userList.length]);

  // helper functions
  function reloadUserList() {
      return api.getAllUsers()
          .then(resp => {
              setUserList(resp.data);
          return resp.data;
          })
          .catch(error => {
              console.error('Error fetching users:', error);
          throw error;
          });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Background {...backgroundColors} />
      <Navbar language={language} setLanguage={setLanguage}/>
      <ToastAlert />
      <main className='min-h-screen w-full flex items-center justify-center pt-40 sm:pt-20 px-4'>
        <Outlet context={{ userList, language, reloadUserList }}/>
      </main>
    </div>
  );
}