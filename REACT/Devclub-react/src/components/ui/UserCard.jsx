import { cn } from '@/lib/Utils';
import Button from './Button.jsx';
import trashIcon from '@/assets/trash.svg';
import pencilIcon from '@/assets/pencil.svg';

/* 
* @param {string} id - The unique identifier of the user.
* @param {string} name - The name of the user to search for.
* @param {int} age - The age of the user.
* @param {string} email - The email of the user.
* @param {string} type - Card layout type, can be 'long' / 'card'
*/
export default function UserCard ({ id = '', name = '', age = 0, email = '', type = 'long' }) {
    
    const cardType = {
        card: 'flex flex-col h-32',
        long: 'flex w-full h-20'
    }
    const buttonType = {
        card: 'flex mt-4 justify-end gap-2',
        long: 'flex ml-4'
    }

    return (
        <div className={cn(
                `border border-zinc-300 rounded-lg justify-between group`, 
                'hover:ring-2 hover:ring-cyan-600 hover:shadow-lg hover:shadow-blue-300/50 transition-all duration-400 ease-in-out',
                cardType[type] || cardType['long'] 
            )}>
            <div className='group flex flex-col align-middle p-2 gap-1 w-100'>
                <div className='flex wrap-break-word justify-between'>
                    <h3 className={`group-hover:text-cyan-300 transition-colors duration-500`}>{name}</h3>
                    <p className='text-gray-400 group-hover:text-white transition-colors duration-500'>Age: {age}</p>
                </div>
                <p className='text-gray-400 group-hover:text-white transition-colors duration-500'>{email}</p>
            </div>
            <div className={
                cn(buttonType[type] || buttonType['long']
                )} >
                <Button variant='transparent' size='sm' >
                    <img src={pencilIcon} alt="" className='size-10 '/>
                </Button>
                <Button variant='transparent' size='sm' >
                    <img src={trashIcon} alt="" className='size-10 '/>
                </Button>
            </div>
        </div>
    );

}