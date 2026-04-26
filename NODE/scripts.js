
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region Featured Exercise
//        simple CRUD operations using node.js and express, with a simple user class and a simulated database (array).
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Backend = {
    // Get all users
    async getUserList() {
        const response = await fetch('/users');
        if (!response.ok) throw new Error('Failed to fetch users error: ' + response.status);
        return await response.json();
    },

    // Add a new user
    async add(user) {
        const response = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (!response.ok) throw new Error('Failed to add user error: ' + response.status);
        return await response.json();
    },

    // Update an existing user
    async update(user) {
        const response = await fetch('/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (!response.ok) throw new Error('Failed to update user error: ' + response.status);
        return await response.json();
    },

    // Delete a user by name
    async delete(name) {
        const response = await fetch('/users', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        if (!response.ok) throw new Error('Failed to delete user error: ' + response.status);
        return await response.json();
    }
};

class User {
    constructor(name = "", age = 0) {
        this.name = name;
        this.age = age;
    }
}

function attList(UserList) {
    const htmlList = document.getElementById('userList');
    htmlList.innerHTML = ''; // Clear existing list
  
    UserList.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name} (${user.age}yo)`;
        htmlList.appendChild(listItem);
    });
}




// Initial load of users
document.addEventListener('DOMContentLoaded', async () => {
  attList(await Backend.getUserList());
});