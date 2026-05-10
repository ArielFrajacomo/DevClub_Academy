import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import UserPage from './pages/UserPage.jsx';
import UserList from './pages/UserList.jsx';

const router = createBrowserRouter([
    // Created in en-US and pt-BR versions for better accessibility (and SEO)
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/inicio',
        element: <Home />
    },
    {
        path: '/search',
        element: <UserPage />
     },
     {
        path: '/buscar',
        element: <UserPage />
     },
     {
        path: '/list-of-users',
        element: <UserList />
    },
    {
        path: '/lista-de-usuarios',
        element: <UserList />
    }
]);

export default router;