import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { api } from '../services/api.js';
import UserCard from '../components/ui/UserCard.jsx';

export default function UserList () {
    const { userList, setUserList , reloadUserList } = useOutletContext();

    // render the user list
    return (
        <div className='h-full w-full flex flex-col items-center justify-center gap-4'>
            <h2>User List</h2>
            <ul className='p-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {userList.map(user => (
                    <li key={user.id}>
                        <UserCard id={user.id} name={user.name} age={user.age} email={user.email} type="long" />
                    </li>
                ))}
            </ul>
            <button onClick={reloadUserList}>Reload User List</button>
        </div>
    );
}