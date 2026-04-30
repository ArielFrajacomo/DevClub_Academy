
import { User , Backend } from './server-classes.js'; // Importing the User class and validateUserData function from 02-scripts.js
const mongoUser = new User();
const backend = new Backend(Backend.SERVICE.PRISMA_USERS);
const userList = []; // This will hold the list of users fetched from the backend



//#region Functions
const searchName = document.getElementById('searchName');
const inputId = document.getElementById('txtID');
const inputName = document.getElementById('txtName');
const inputAge = document.getElementById('txtAge');
const inputEmail = document.getElementById('txtEmail');

// Adding a method to the User class prototype to load data from input fields
User.prototype.loadDataFromInputs = function() {
    this.id = inputId.value.trim();
    this.name = inputName.value.trim();
    this.age = parseInt(inputAge.value.trim()) || 0;
    this.email = inputEmail.value.trim();
};


// Functions for buttons
function btnSearchUser() {
    mongoUser.loadDataFromInputs();
    if (mongoUser.checkId()) {
        backend.getUserById(mongoUser.id)
            .then(user => {
                if (user) {
                    mongoUser.getFromJson(user);
                    // Update input fields with user data
                    inputName.value = mongoUser.name;
                    inputAge.value = mongoUser.age;
                    inputEmail.value = mongoUser.email;
                } else {
                    alert('User not found.');
                }
            })
            .catch(error => {
                console.error('Error fetching user:', error);
                alert('Failed to fetch user.');
            });
    }
}
function btnSearchAllUsers() {
    
}
function btnAddUser() {
    
}
function btnUpdateUser(ID) {
    
}
function btnDeleteUser(ID) {
    
}

// Display function
function createEditDeleteButtons(ID) {

    // Create Edit button
    const btnEdit = document.createElement('button');
    btnEdit.textContent = '…';
    btnEdit.onclick = () => btnEditUser(ID);

    // Create Delete button
    const btnDelete = document.createElement('button');
    btnDelete.textContent = '✕';
    btnDelete.onclick = () => btnDeleteUser(ID);
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

//#endregion Functions

//#region Init
reloadDisplay(await backend.getAllUsers());
//#endregion Init