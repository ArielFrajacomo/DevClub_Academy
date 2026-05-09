import cn from '../../lib/Utils.js';

/* 
* @param {string} id - The unique identifier of the user.
* @param {string} name - The name of the user to search for.
* @param {int} age - The age of the user.
* @param {string} email - The email of the user.
* @param {string} Type - Card layout type, can be 'long' / 'card'
*/
export default function UserCard ({ id = '', name = '', age = 0, email = '', type = 'long' }) {
    
    const cardClass = type === 'card' ? 'w-64 h-32' : 'w-full h-16';

    return (
        <div className='border rounded-lg m-4 p-4 '
        >
            <h3>{name}</h3>
            <p>Age: {age}</p>
            <p>Email: {email}</p>
        </div>
    );

}