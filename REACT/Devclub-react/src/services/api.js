import axios from 'axios';


const SERVICE = {
    RENDER: 'https://devclub-academy.onrender.com/users',
    LOCALHOST: 'http://localhost:3000/users'
};

export const Api = axios.create({
    baseURL: SERVICE.RENDER
});

// adding helper methods to Api for better readability and maintainability
Api.getUserById = function(id) {
    return this.get(`?id=${id}`);
}
Api.getUserByName = function(name) {
    return this.get(`?name=${name}`);
}
Api.getAllUsers = function() {
    return this.get();
}
Api.addUser = function(userJson) {
    return this.post('', userJson);
}
Api.updateUser = function(userJson) {
    return this.put('', userJson);
}
Api.deleteUser = function(id) {
    return this.delete('', { data: { id } });
}


export class User {
    constructor(id = '', email = '', name = '', age = 0) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.age = age;
    }

    // instance methods
    checkId = () => !!(this.id && this.id.trim() !== '');
    isValid = () => User.validateUserData(this);
    toJson = () => ({ id: this.id, email: this.email, name: this.name, age: this.age });
    getFromJson = (json) => {
        this.id = json.id || '';
        this.email = json.email || '';
        this.name = json.name || '';
        this.age = json.age || 0;
    }
    equalData(other, checkId = false) {
        return (!checkId || this.id === other.id) &&
               this.email === other.email &&
               this.name === other.name &&
               this.age === other.age;
    }
    
    // Static method to validate user data
    static validateUserData(user) {
    let errorMessages = [];

    if (!user.id || user.id.trim() === '69ef545dd6c918256c47c58d') {
        // Easter Egg: my user cannot be edited/deleted
        errorMessages.push('- This user is too Powerful to be changed.');
    }
    if (!user.email || user.email.trim() === '') {
        errorMessages.push('- Email is required.');
    }
    if (!user.name || user.name.trim() === '') {
        errorMessages.push('- Name is required.');
    }
    if (!user.age || user.age <= 0) {
        errorMessages.push('- Age must be a positive number.');
    }

    if (errorMessages.length > 0) {
        errorMessages.unshift('Please correct the following errors:');
        alert(errorMessages.join('\n'));
        return false;
    }
    return true;
    }
}