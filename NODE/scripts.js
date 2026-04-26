
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region Featured Exercise
//        simple CRUD operations using node.js and express, with a simple user class and a simulated database (array).
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//#region Classes
const NameImput = document.getElementById('txtName');
const AgeInput = document.getElementById('txtAge');

class User {
    name = '';
    age = 0;

    constructor(name = '', age = 0) {
        this.name = name;
        this.age = age;
    }

    getName = () => NameImput.value || NameImput.textContent || NameImput.innerText  || NameImput.innerHTML ||'';
    getAge = () => parseInt(AgeInput.value || AgeInput.textContent || AgeInput.innerText  || AgeInput.innerHTML || '0');
    
    getPageData = () => {
        this.name = this.getName();
        this.age = this.getAge();
    };

    json = () => ({ name: this.name, age: this.age });
}

const Backend = {
    SERVICE: {
        USERS: 'http://localhost:3000/users',
    },
    // Get all users
    async getUserList() {
        const response = await fetch(this.SERVICE.USERS);
        if (!response.ok) throw new Error('Failed to fetch users error: ' + response.status);
        return await response.json();
    },

    // Add a new user
    async add(user) {
        const response = await fetch(this.SERVICE.USERS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (!response.ok) throw new Error('Failed to add user error: ' + response.status);
        return await response.json();
    },

    // Update an existing user
    async update(user) {
        const response = await fetch(this.SERVICE.USERS, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (!response.ok) throw new Error('Failed to update user error: ' + response.status);
        return await response.json();
    },

    // Delete a user by name
    async delete(name) {
        const response = await fetch(this.SERVICE.USERS, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        if (!response.ok) throw new Error('Failed to delete user error: ' + response.status);
        return await response.json();
    }
};
//#endregion Classes


//#region Functions
function attDisplay(UserList) {
    const htmlList = document.getElementById('userList');
    if (!htmlList) {
        return;
    }

    htmlList.innerHTML = ''; // Clear existing list
  
    UserList.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name} (${user.age}yo)`;
        htmlList.appendChild(listItem);
    });
}

function btnAddUser() {
    // send data via body
    const user = new User();
    user.getPageData();

    Backend.add(user.json())
        .then(() => loadUsers())
        .catch(error => console.error('Error adding user:', error));

    Backend.getUserList()
        .then(users => attDisplay(users))
        .catch(error => console.error('Error fetching users:', error));
}

function btnUpdateUser() {
    const user = new User();
    user.getPageData();

    Backend.update(user.json())
        .then(() => loadUsers())
        .catch(error => console.error('Error updating user:', error));
    
    Backend.getUserList()
        .then(users => attDisplay(users))
        .catch(error => console.error('Error fetching users:', error));
}

function btnDeleteUser() {
    const user = new User();
    user.getPageData();

    Backend.delete(user.name)
        .then(() => loadUsers())
        .catch(error => console.error('Error deleting user:', error));

    Backend.getUserList()
        .then(users => attDisplay(users))
        .catch(error => console.error('Error fetching users:', error));
}


//#endregion Functions


//#region Initialization
// Initial load of users
async function loadUsers() {
    const list = await Backend.getUserList().then(users => users);
    attDisplay(list);
}

document.addEventListener('DOMContentLoaded', loadUsers);
//#endregion Initialization