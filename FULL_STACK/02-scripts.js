
import * as Classes from './server-classes.js'; // Importing the User class and validateUserData function from 02-scripts.js
const mongoUser = new Classes.User();
const backend = new Classes.Backend();

//#region Functions
const inputId = document.getElementById('txtID');
const inputName = document.getElementById('txtName');
const inputAge = document.getElementById('txtAge');
const inputEmail = document.getElementById('txtEmail');

// Adding a method to the User class prototype to load data from input fields
Classes.User.prototype.loadDataFromInputs = function() {
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
function btnUpdateUser() {
    
}
function btnDeleteUser() {
    
}

//#endregion Functions