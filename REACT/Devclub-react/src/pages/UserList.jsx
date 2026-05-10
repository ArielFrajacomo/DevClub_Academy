import { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export default function UserList () {
    const [userDataset, setUserDataset] = useState([]);

    // initialize user list on page load
    useEffect(() => {
        reloadUserList();
    }, []);

    // helper functions
    function reloadUserList() {
        api.getAllUsers()
            .then(resp => {
                setUserDataset(resp.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    // render the user list
    return (
        <div className='h-full w-full flex flex-col items-center justify-center gap-4'>
            <h2>User List</h2>
            <ul>
                {userDataset.map(user => (
                    <li key={user.id}>{user.name} ({user.email}) - Age: {user.age}</li>
                ))}
            </ul>
            <button onClick={reloadUserList}>Reload User List</button>
        </div>
    );
}