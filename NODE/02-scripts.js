
//#region Imports
import { User , Backend } from './server-classes.js'; // Importing the User class and validateUserData function from 02-scripts.js


//#endregion Imports

//#region global variables
const mongoUser = new User();
const backend = new Backend(Backend.SERVICE.PRISMA_USERS);
const userList = []; // This will hold the list of users fetched from the backend

const inputSearchName = document.getElementById('inputSearchName');

const inputName = document.getElementById('inputName');
const inputAge = document.getElementById('inputAge');
const inputEmail = document.getElementById('inputEmail');

const labelId = document.getElementById('labelId');
const btnAddUser = document.getElementById('addUserBtn');
const btnUpdateUser = document.getElementById('updateUserBtn');
//#endregion global variables and DOM elements

//#region Prototypes
User.prototype.loadDataFromInputs = function() {
    this.id = labelId.innerHTML.replace(/[()]/g, '').trim();
    this.name = inputName.value.trim();
    this.age = parseInt(inputAge.value.trim()) || 0;
    this.email = inputEmail.value.trim();
};

Backend.prototype.AttDisplay = function() {
    userList.length = 0; // Clear the user list

    this.getAllUsers()
        .then(users => {
            userList.push(...users);
            reloadDisplay(userList);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            alert('Failed to fetch users.');
        });
}
//#endregion Prototypes

//#region Events
function eventSendToEditUser(ID) {
    // Find the user in the userList by ID
    const user = userList.find(u => u.id === ID);

    if (user) {
        labelId.innerHTML = `(${user.id})`;
        inputName.value = user.name;
        inputAge.value = user.age;
        inputEmail.value = user.email;
    } else {
        clearInputFields();
    }
    controlsLogic();
}

// Backend Buttons Events
function eventSearchUser() {
    const name = inputSearchName.value.trim();
    if (name === '') {
        alert('Please enter a name to search.');
        return;
    }

    backend.getUserByName(name)
        .then(resp => {
            if (resp) {
                userList.length = 0; // Clear the user list
            
                // Special Note:
                // userlist is a const, so we cannot reassign it. 
                // push with spread operator was used to add all users from the response to the userList array.
                userList.push(...resp); 

                reloadDisplay(userList);
            } else {
                alert('User not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            alert('Failed to fetch user.');
        });
}

function eventSearchAllUsers() {
    backend.AttDisplay();
}

function eventAddUser() {
    mongoUser.loadDataFromInputs();
    if (!mongoUser.isValid()) {
        return;
    }
    backend.add(mongoUser)
        .then(newUser => {
            userList.push(newUser);
            reloadDisplay(userList);
            clearInputFields();
        })
        .catch(error => {
            console.error('Error creating user:', error);
            alert('Failed to create user.');
        });
}

function eventUpdateUser() {
    mongoUser.loadDataFromInputs();
    if (!mongoUser.isValid()) {
        return;
    }
    backend.update(mongoUser)
        .then(updatedUser => {
            const index = userList.findIndex(u => u.id === mongoUser.id);

            if (index !== -1) {
                userList[index] = updatedUser;
                reloadDisplay(userList);
                clearInputFields();

                console.log('User updated successfully:', updatedUser);
            }
        })
        .catch(error => {
            console.error('Error updating user:', error);
            alert('Failed to update user.');
        });
}

function eventDeleteUser(ID) {
    mongoUser.loadDataFromInputs();

    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    backend.delete(ID)
        .then(() => {
            const index = userList.findIndex(u => u.id === ID);
            if (index !== -1) {
                userList.splice(index, 1);
                reloadDisplay(userList);
                clearInputFields();
            }
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            alert('Failed to delete user.');
        }); 
}
//#endregion Events

//#region Functions

// Display function
function createEditDeleteButtons(ID) {

    // Create Edit button
    const btnEdit = document.createElement('button');
    btnEdit.textContent = '…';
    btnEdit.onclick = () => eventSendToEditUser(ID);

    // Create Delete button
    const btnDelete = document.createElement('button');
    btnDelete.textContent = '✕';
    btnDelete.onclick = () => eventDeleteUser(ID);
    return [btnEdit, btnDelete];
}

function reloadDisplay(ulist) {
    const display = document.getElementById('userList');
    display.innerHTML = '';
    ulist.forEach(user => {
        const userItem = document.createElement('li');
        userItem.style.display = 'grid';
        userItem.style.gridTemplateColumns = '18fr 1fr 1fr';
        userItem.style.gap = '4px';
        userItem.style.borderBottom = '1px solid #666';
        userItem.style.borderRadius = '4px';
        userItem.style.padding = '4px';
        userItem.style.margin = '2px 0';
        userItem.style.backgroundColor = '#eee';
        userItem.innerHTML = `<div">Name: ${user.name}, Age: ${user.age} <br> Email: ${user.email}</div>`;
        
        const [btnEdit, btnDelete] = createEditDeleteButtons(user.id);
        display.appendChild(userItem);
        userItem.appendChild(btnEdit);
        userItem.appendChild(btnDelete);
    });
}

function clearInputFields() {
    labelId.innerHTML = '';
    inputName.value = '';
    inputAge.value = '';
    inputEmail.value = '';

    controlsLogic();
}

function controlsLogic() {
    // disables buttons that cannot be used in the current state (e.g. if no user is selected, disable update and delete buttons)
    const isEditing = labelId.innerHTML.trim() !== '';
    btnAddUser.disabled = isEditing;
    btnUpdateUser.disabled = !isEditing;

}

//#endregion Functions

//#region Init
function init() {

    backend.AttDisplay();
    clearInputFields();

    // Attach event listeners to buttons
    document.getElementById('searchUserBtn').addEventListener('click', eventSearchUser);
    document.getElementById('searchUserAllBtn').addEventListener('click', eventSearchAllUsers);

    document.getElementById('addUserBtn').addEventListener('click', eventAddUser);
    document.getElementById('updateUserBtn').addEventListener('click', eventUpdateUser);
    document.getElementById('clearUserBtn').addEventListener('click', clearInputFields);
}

init();
//#endregion Init