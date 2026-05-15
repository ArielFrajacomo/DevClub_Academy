import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import { useState , useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { api , User } from '../services/api.js';
import ToastAlert, { toast } from '../components/ui/ToastAlert.jsx';

export default function UserPage () {
  //get data from label ID
  const { userList , reloadUserList , language } = useOutletContext();
  const [inputName, setInputName] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const { id } = useParams();

  const dict = {
    en_US: {
      searchURL: 'search',

      title: 'User Details',
      ageName: 'Age',
      ageLabel: 'Age',
      ageEmail: 'e-mail',
      buttonSearch: 'Search',
      buttonEdit: 'Edit',

      successEdit: 'User edited successfully.',
      successCreate: 'User created successfully.',
      userNotFound: 'User not found.',
      error: 'Error occurred while processing the user.',

      easterEgg: 'No-one can change the creator, not even me, the creator.'
    },
    pt_BR: {
      searchURL: 'buscar',

      title: 'Detalhes do Usuário',
      ageName: 'Idade',
      ageLabel: 'Idade',
      ageEmail: 'e-mail',
      buttonSearch: 'Buscar',
      buttonEdit: 'Editar',

      successEdit: 'Usuário editado com sucesso.',
      successCreate: 'Usuário criado com sucesso.',
      userNotFound: 'Usuário não encontrado.',
      error: 'Ocorreu um erro ao processar o usuário.',

      easterEgg: 'Ninguém pode mudar o criador, nem mesmo eu, o criador.'
    }
  }

  useEffect(() => {
    if (id) {
      searchUserList();
    }
  }, [id, userList])
  

//#region old search function, to be refactored
  // async function search(debug = false) {
  //   const user = new User();
  //   user.id = id;
  //   user.name = inputName.trim();
  //   user.age = parseInt(inputAge.trim()) || 0;
  //   user.email = inputEmail.trim();

  //   console.log(id);
  //   console.log(user.checkId());
  //   console.log(user.id === '69ef545dd6c918256c47c58d');

  //   if (user.checkId()) {
  //     if (user.id === '69ef545dd6c918256c47c58d') {
  //       toast.warning(dict[language].easterEgg);
  //       return;
  //     }

  //     api.getUserById(user.id)
  //       .then (response => {

  //         debug && console.log('Full Axios response:', response); 

  //         const data = response.data;
  //         if (data && data.id) {
  //           user.getFromJson(data);
            
  //           setInputName(user.name);
  //           setInputAge(user.age.toString());
  //           setInputEmail(user.email);
  //         } else {
  //           toast.error('User not found.');
  //           console.log('User not found with ID:', user.id, 'Response data:', data);
  //         }
  //       });
  //   }

  //   console.log('Searching for user with data:', user);

  //   if (user.name !== '') {

  //     api.getUserByName(user.name)
  //       .then(response => {
  //         console.log('Full Axios response:', response); // helpful for debugging
  //         const data = response.data;
          
  //         if (data && (Array.isArray(data) ? data.length > 0 : data.id)) {
  //           user.getFromJson(Array.isArray(data) ? data[0] : data);
            
  //           setInputName(user.name);
  //           setInputAge(user.age.toString());
  //           setInputEmail(user.email);
            
  //           //set params to URL busca/:id search/:id
  //           if (window.location.pathname !== `/${dict[language].searchURL}/${user.id}`) {
  //             window.history.replaceState(null, '', `/${dict[language].searchURL}/${user.id}`);
  //           }

  //         } else {
  //           toast.error('User not found.');
  //           console.log('User not found with name:', user.name, 'Response data:', data);
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error:', error.response || error);
  //         toast.error('User not found or API error.');
  //       });
  //   }
  // }
//#endregion old search function, to be refactored
  function btnSearch() {
    
  alert(`clicked | id: ${id} | hasId: ${Boolean(id)}`);
  console.log({ id, hasId: Boolean(id) });

    if (!!id) {
      searchUserList();
    } else {
      searchDatabase();
    }
  }
  function searchDatabase() {
    const user = new User();
    
    
  }
  function searchUserList() {
    const user = new User();
    
    // make sure that the server woke up and the user list is loaded
    if (userList.length === 0) {
      reloadUserList();
      return;
    }

    // Search user in the user list first, it will be faster than searching in the server.
    const foundUser = userList.find(u => u.id === id);
    if (foundUser) {
      user.getFromJson(foundUser);
      
      setInputName(user.name);
      setInputAge(user.age.toString());
      setInputEmail(user.email);
    } else {
      toast.error(dict[language].userNotFound);
      console.log('User not found with ID:', id, 'User list:', userList);
    }
  }


  function editUser() {
    // Edit (or Create) user, if ID is empty, it will create a new user.
    console.log('edit user');
  }
  function isEditing() {
    return Boolean(id);
  }
  function clearInputFields() {
    setInputName('');
    setInputAge('');
    setInputEmail('');
  }

  return (
    // react needs a parent wrapping everything
    <div className="h-full w-5xl mx-auto flex flex-col items-center justify-center"> 
      <h1 className="text-center p-4" >Registered Users</h1>
      <div className='w-l'>
        <div className="flex gap-4 mb-4">
          <Input value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Name" id="txtName" boxSize="full" type="text" />
          <Input value={inputAge} onChange={(e) => setInputAge(e.target.value)} placeholder="Age" id="txtAge" boxSize="full" type="number" />
        </div>
          <Input value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} placeholder="Email" id="txtEmail" boxSize="full" type="email" />
      </div>
      <div className='flex justify-between p-4 gap-4'>
        <Button size='lg' type="button" onClick={btnSearch} >Search</Button>
      </div>
    </div>
  );
}