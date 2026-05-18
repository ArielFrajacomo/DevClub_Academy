import { useOutletContext } from 'react-router-dom'
import UserCard from '../components/ui/UserCard.jsx'
import { cn } from '../lib/Utils.js'
import Button from '../components/ui/Button.jsx'
import { toast } from '../components/ui/ToastAlert.jsx'

export default function UserList() {
    const { userList, reloadUserList, language } = useOutletContext()

    const dict = {
        en_US: {
            title: 'User List',
            reloadButton: 'Reload User List',
            reloadButtonMessage: 'Reloading user list...',
            noUsers: [
                'No users found.',
                'Server might be waking up, it takes up to 60 seconds.',
            ],
        },
        pt_BR: {
            title: 'Lista de Usuários',
            reloadButton: 'Recarregar Lista de Usuários',
            reloadButtonMessage: 'Recarregando lista de usuários...',
            noUsers: [
                'Nenhum usuário encontrado.',
                'Aguarde o servidor acordar, pode demorar até uns 60 segundos.',
            ],
        },
    }

    function handleReloadButton() {
        reloadUserList()
        toast.system(dict[language].reloadButtonMessage)
    }

    // render the user list
    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-4 pt-40 sm:pt-20">
            <h2 className="text-3xl font-bold text-gray-900 text-shadow-lg text-shadow-black/20 dark:text-gray-50">
                {dict[language].title}
            </h2>
            <ul className="p-10 sm:p-2 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userList.map((user) => (
                    <li key={user.id}>
                        <UserCard
                            id={user.id}
                            name={user.name}
                            age={user.age}
                            email={user.email}
                            type="long"
                        />
                    </li>
                ))}
                {userList.length === 0 && (
                    <li
                        className="text-red-500 col-span-full text-center text-lg font-semibold"
                        key="no-users"
                    >
                        {dict[language].noUsers[0]}
                        <br />
                        {dict[language].noUsers[1]}
                    </li>
                )}
            </ul>
            <Button onClick={handleReloadButton} variant="ghost">
                {dict[language].reloadButton}
            </Button>
        </div>
    )
}
