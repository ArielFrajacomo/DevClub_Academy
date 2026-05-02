
//#region Imports
import { User , Backend , showMessage } from './server-classes.js'; // Importing the User class and validateUserData function from 02-scripts.js


//#endregion Imports

//#region global variables

 // Change this to Backend.SERVICE.LOCALHOST if you want to test with your local server instead of the Render deployment
const backend = new Backend(Backend.SERVICE.RENDER);

const mongoUser = new User();
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
// NOTE: Using prototypes here just to showcase the concept for the DevClub course.
// In real production code we avoid mutating prototypes and prefer clean functions or classes.
// This makes the code easier to maintain and avoids unexpected side effects.
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
            inputSearchName.value = '';
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            showMessage('Failed to fetch users.');
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
        showMessage('Please enter a name to search.');
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
                showMessage('User not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            showMessage('Failed to fetch user.');
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
            showMessage('Failed to create user.');
        });
}

function eventUpdateUser() {
    mongoUser.loadDataFromInputs();
    if (!mongoUser.isValid()) {
        return;
    }
    backend.update(mongoUser)
        .then(updatedUser => {
            if (!updatedUser) {
                return;
            }
        
            const index = userList.findIndex(u => u.id === mongoUser.id);

            if (index !== -1) {
                userList[index] = updatedUser;
                reloadDisplay(userList);
                clearInputFields();
            }
        })
        .catch(error => {
            console.error('Error updating user:', error);
            showMessage('Failed to update user.');
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
            showMessage('Failed to delete user.');
        }); 
}
//#endregion Events

//#region Functions

// Display function
function createEditDeleteButtons(ID) {

    // Create Edit button
    const btnEdit = document.createElement('button');
    btnEdit.textContent = '…';
    btnEdit.classList.add('edit-btn');
    btnEdit.onclick = () => eventSendToEditUser(ID);

    // Create Delete button
    const btnDelete = document.createElement('button');
    btnDelete.textContent = '✕';
    btnDelete.classList.add('edit-btn');
    btnDelete.onclick = () => eventDeleteUser(ID);

    const wrapper = document.createElement('div');
    wrapper.classList.add('user-actions');
    wrapper.appendChild(btnEdit);
    wrapper.appendChild(btnDelete);
    
    return wrapper;
}

function reloadDisplay(ulist) {
    const display = document.getElementById('userList');
    display.innerHTML = '';
    ulist.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `<div>Name: ${user.name}, Age: ${user.age} <br> Email: ${user.email}</div>`;
        
        const actionButtons = createEditDeleteButtons(user.id);
        
        display.appendChild(userItem);
        userItem.appendChild(actionButtons);
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

    setTimeout(() => showMessage('Welcome to the User Management App!', 'success'), 1000);
}

init();
//#endregion Init