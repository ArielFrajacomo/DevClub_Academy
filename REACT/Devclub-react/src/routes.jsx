import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import UserPage from './pages/UserPage.jsx';
import UserList from './pages/UserList.jsx';

const router = createBrowserRouter([
    // Created in en-US and pt-BR versions for better accessibility (and SEO)
    {
        path: '/',
        element: <Layout />,                // Layout wraps everything
        errorElement:                       // Simple error element for good practices and training only, i'll have a better one in the final project
            <div className='bg-red-600 justify-center items-center flex h-full flex-col gap-4'>
                <div className='text-9xl'>Page not found</div>
                <div className='text-xs'> This is the most simple, and yet aggressive screen I ever seeing hahahaha lmao</div>
            </div>,
        children: [                         // outlet for nested routes
            {
                index: true,                // This means "/"
                element: <Home />
            },
            {
                path: 'search',
                element: <UserPage />
            },
            {
                path: 'buscar',
                element: <UserPage />
            },
            {
                path: 'list',
                element: <UserList />
            },
            {
                path: 'list-of-users',
                element: <UserList />
            },
            {
                path: 'lista-de-usuarios',
                element: <UserList />
            },
        ]
    }
]);

export default router;