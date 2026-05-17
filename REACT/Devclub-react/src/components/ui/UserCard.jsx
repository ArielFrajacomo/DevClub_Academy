import { cn } from '@/lib/Utils';
import Button from './Button.jsx';
import trashIcon from '@/assets/trash.svg';
import pencilIcon from '@/assets/pencil.svg';
import { api } from '../../services/api.js';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast } from './ToastAlert.jsx';

/**
 * UserCard component displays user information in a card layout.
 * @param {string} id - The unique identifier of the user.
 * @param {string} name - The name of the user to search for.
 * @param {number} age - The age of the user.
 * @param {string} email - The email of the user.
 * @param {'long'|'card'} [type='long'] - Card layout type.
*/
export default function UserCard ({ id = '', name = '', age = 0, email = '', type = 'long' }) {
    const { language , reloadUserList } = useOutletContext(); 
    const navigate = useNavigate();
    
    const cardType = {
        card: 'flex flex-col h-32',
        long: 'flex w-full h-20'
    }
    const buttonType = {
        card: 'flex mt-4 justify-end gap-2',
        long: 'flex ml-4'
    }

    const dict = {
        en_US: {
            ageLabel: 'Age',
            searchURL: 'search',
            deleteConfirmation: `Are you sure you want to delete user: ${name}?`,
            deleteSuccess: 'User deleted successfully.',
            deleteError: 'Error deleting user.'
        },
        pt_BR: {
            ageLabel: 'Idade',
            searchURL: 'buscar',
            deleteConfirmation: `Tem certeza que deseja deletar o usuário: ${name}?`,
            deleteSuccess: 'Usuário deletado com sucesso.',
            deleteError: 'Erro ao deletar usuário.'
        }
    }

    // Navigate to user page with user id as parameter
    function gotoUserPage(id) {
        navigate(`/${dict[language].searchURL}/${id}`);
        reloadUserList();
    }
    function deleteUser() {
        console.log('Deleting user with id:', id);

        api.deleteUser(id)
            .then(() => {
                reloadUserList().then(() => {
                    toast.success(dict[language].deleteSuccess);
                });
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
                toast.error(dict[language].deleteError);
            });
    }

    return (
        <div className={cn(
                'border border-zinc-300 rounded-lg justify-between group transition-all duration-400 ease-in-out',
                'backdrop-blur-sm dark:backdrop-blur-none border-gray-500/70 dark:border-gray-700', 
                'hover:ring-2 hover:ring-cyan-500 hover:shadow-lg hover:shadow-blue-300/50 hover:backdrop-blur-xs font-semibold text-sm',
                cardType[type] || cardType['long'] 
            )}>
            <div className='group flex flex-col align-middle p-2 gap-1 w-100'>
                <div className='flex wrap-break-word justify-between'>
                    <h3 className='group-hover:text-sky-700 dark:group-hover:text-cyan-300 transition-colors duration-500 text-gray-900 dark:text-white'>{name}</h3>
                    <p className='text-gray-400 text-xs sm:text-base group-hover:text-slate-700 dark:group-hover:text-white transition-colors duration-500'>{dict[language].ageLabel}: {age}</p>
                </div>
                <p className='text-gray-400 text-xs sm:text-sm group-hover:text-slate-700 dark:group-hover:text-white transition-colors duration-500'>{email}</p>
            </div>
            <div className={cn(
                    'shrink-0',
                    buttonType[type] || buttonType['long']
                )} >
                <Button variant='transparent' size='sm' onHover='hover:bg-amber-800/80 dark:hover:bg-amber-900/40' onClick={() => gotoUserPage(id)}>
                    <img src={pencilIcon} alt="" className='size-3.5 sm:size-4'/>
                </Button>
                <Button variant='transparent' size='sm' onHover='hover:bg-red-800/80 dark:hover:bg-red-950/40' 
                    //
                    onClick={deleteUser} confirmAction={true} confirmMessage={dict[language].deleteConfirmation} >
                    <img src={trashIcon} alt="" className='size-3.5 sm:size-4'/>
                </Button>
            </div>
        </div>
    );
}