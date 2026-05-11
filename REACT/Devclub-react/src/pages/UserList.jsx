import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { api } from '../services/api.js';

export default function UserList () {
    const { userList, setUserList , reloadUserList } = useOutletContext();

    // render the user list
    return (
        <div className='h-full w-full flex flex-col items-center justify-center gap-4'>
            <h2>User List</h2>
            <ul>
                {userList.map(user => (
                    <li key={user.id}>{user.name} ({user.email}) - Age: {user.age}</li>
                ))}
            </ul>
            <button onClick={reloadUserList}>Reload User List</button>
        </div>
    );
}