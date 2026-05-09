import axios from 'axios';


export class Api {
    static SERVICE = {
    RENDER: 'https://devclub-academy.onrender.com/users',
    LOCALHOST: 'http://localhost:3000/users'
    };

    constructor(baseURL = Api.SERVICE.RENDER) {
        this.client = axios.create({ baseURL });
    }
    getUserById(id) {
        return this.client.get(`?id=${id}`);
    }
    getUserByName(name) {
        return this.client.get(`?name=${name}`);
    }
    getAllUsers() {
        return this.client.get();
    }
    addUser(userJson) {
        return this.client.post('', userJson);
    }
    updateUser(userJson) {
        return this.client.put('', userJson);
    }
    deleteUser(id) {
        return this.client.delete('', { data: { id } });
    }
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

export const api = new Api();