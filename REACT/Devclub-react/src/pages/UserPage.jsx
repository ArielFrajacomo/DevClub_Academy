import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import { useState } from 'react';
import { api , User } from '../services/api.js';

export default function UserPage () {
  //get data from label ID
  const [labelID, setLabelID] = useState('Searching...');
  const [inputName, setInputName] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  async function search() {
    const user = new User();

    user.id = labelID.replace(/[()]/g, '').trim();
      // If it's still searching, set ID to empty
      user.id = user.id === 'Searching...' ? '' : user.id; 
    user.name = inputName.trim();
    user.age = parseInt(inputAge.trim()) || 0;
    user.email = inputEmail.trim();

    console.log('Searching for user with data:', user);

    if (user.name !== '') {

      api.getUserByName(user.name)
        .then(response => {
          console.log('Full Axios response:', response); // helpful for debugging
          const data = response.data;
          
          if (data && (Array.isArray(data) ? data.length > 0 : data.id)) {
            user.getFromJson(Array.isArray(data) ? data[0] : data);
            
            setInputName(user.name);
            setInputAge(user.age.toString());
            setInputEmail(user.email);
            setLabelID(`(${user.id})`);
          } else {
            alert('User not found.');
          }
        })
        .catch(error => {
          console.error('Error:', error.response || error);
          alert('User not found or API error.');
        });
    }
  }
  function editUser() {
    // Edit (or Create) user, if ID is empty, it will create a new user.
    console.log('edit user');
  }
  function isEditing() {
    return !(labelID === 'Searching...');
  }
  function clearInputFields() {
    setLabelID('Searching...');
    setInputName('');
    setInputAge('');
    setInputEmail('');
  }

  return (
    // react needs a parent wrapping everything
    <div className="h-full w-5xl mx-auto flex flex-col items-center justify-center"> 
      <h1 className="text-center p-4" >Registered Users</h1>
      <label>{labelID}</label>
      <div className='w-l'>
        <div className="flex gap-4 mb-4">
          <Input value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Name" id="txtName" boxSize="full" type="text" />
          <Input value={inputAge} onChange={(e) => setInputAge(e.target.value)} placeholder="Age" id="txtAge" boxSize="full" type="number" />
        </div>
          <Input value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} placeholder="Email" id="txtEmail" boxSize="full" type="email" />
      </div>
      <div className='flex justify-between p-4 gap-4'>
        <Button size='lg' type="submit" onClick={search} >Search</Button>
      </div>
    </div>
  );
}