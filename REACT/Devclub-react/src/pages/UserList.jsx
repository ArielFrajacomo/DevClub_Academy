import { useOutletContext } from 'react-router-dom';
import UserCard from '../components/ui/UserCard.jsx';
import { cn } from '../lib/Utils.js';
import Button from '../components/ui/Button.jsx';
import { toast } from '../components/ui/ToastAlert.jsx';

export default function UserList () {
    const { userList, reloadUserList, language } = useOutletContext();

    const dict = {
        en_US: {
            title: 'User List',
            reloadButton: 'Reload User List',
            noUsers: ['No users found.', 'Server might be waking up, try reloading after 30 seconds.']
        },
        pt_BR: {
            title: 'Lista de Usuários',
            reloadButton: 'Recarregar Lista de Usuários',
            noUsers: ['Nenhum usuário encontrado.', 'Servidor pode estar acordando, tente recarregar após 30 segundos.']
        }
    };

    function handleReloadButton() {
        reloadUserList();
        toast.system(language === 'en_US' ? 'Reloading user list...' : 'Recarregando lista de usuários...');
    }

    // render the user list
    return (
        <div className='h-full w-full flex flex-col items-center justify-center gap-4'>
            <h2 className='text-3xl font-bold'>{dict[language].title}</h2>
            <ul className='p-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {userList.map(user => (
                    <li key={user.id}>
                        <UserCard id={user.id} name={user.name} age={user.age} email={user.email} type="long" />
                    </li>
                ))}
                {userList.length === 0 && (
                  <li className='text-red-500' key="no-users">{dict[language].noUsers[0]}<br />{dict[language].noUsers[1]}</li>  
                )}
            </ul>
            <Button onClick={handleReloadButton} variant="ghost">
                {dict[language].reloadButton}
            </Button>
        </div>
    );
}