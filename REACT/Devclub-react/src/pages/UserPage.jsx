import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import { useRef } from 'react';
import { Api , User } from '../../services/api.js';

export default function UserPage () {
  //get data from label ID
  const labelID = useRef(null);
  const inputName = useRef(null);
  const inputAge = useRef(null);
  const inputEmail = useRef(null);

  async function search() {
    const user = new User();


    user.id = labelID.current.innerHTML.replace(/[()]/g, '').trim();
      // If it's still searching, set ID to empty
      user.id = user.id === 'Searching...' ? '' : user.id; 
    user.name = inputName.current.value.trim();
    user.age = parseInt(inputAge.current.value.trim()) || 0;
    user.email = inputEmail.current.value.trim();

    console.log(user);

    if (user.name !== '') {
      Api.getUserByName(user.name)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('User not found', { cause: response });
          }
        })
        .then(data => {
          console.log('User found:', data);
          // Update the input fields with the user data
          user.getFromJson(data);
          console.log(user);

          inputName.current.value = user.name;
          inputAge.current.value = user.age;
          inputEmail.current.value = user.email;
          labelID.current.innerHTML = `(${user.id})`;
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          alert('User not found.');
        });
    }
  }
  function editUser() {
    // Edit (or Create) user, if ID is empty, it will create a new user.
    console.log('edit user');
  }
  function isEditing() {
    return !(labelID.innerHTML === 'Searching...');
  }
  function clearInputFields() {
    labelID.innerHTML = 'Searching...';
    inputName.current.value = '';
    inputAge.current.value = '';
    inputEmail.current.value = '';
  }

  return (
    // react needs a parent wrapping everything
    <div className="h-full w-5xl mx-auto flex flex-col items-center justify-center"> 
      <h1 className="text-center p-4" >Registered Users</h1>
      <label ref={labelID}>Searching...</label>
      <div className='w-l'>
        <div className="flex gap-4 mb-4">
          <Input ref={inputName} placeholder="Name" id="txtName" boxSize="full" type="text" />
          <Input ref={inputAge} placeholder="Age" id="txtAge" boxSize="full" type="number" />
        </div>
          <Input ref={inputEmail} placeholder="Email" id="txtEmail" boxSize="full" type="email" />
      </div>
      <div className='flex justify-between p-4 gap-4'>
        <Button size='lg' type="submit" onClick={search} >Search</Button>
      </div>
    </div>
  );
}