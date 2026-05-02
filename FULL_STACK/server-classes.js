//#region Classes
/*
model User { 
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  email String  @unique
  name  String?
  age   Int?
} 
*/
export class User {
    constructor(id = '', email = '', name = '', age = 0) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.age = age;
    }

    // instance methods
    checkId = () => this.id && this.id.trim() !== '';
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

// Calling Backend to perform CRUD operations
export class Backend {
    // using a enum-like object to store service endpoints
    // this makes the backend class generic and easily adaptable to different services or endpoints by just changing the SERVICE object 
    static SERVICE = {
        PRISMA_USERS: 'http://localhost:3000/prisma/users',
        USER: 'http://localhost:3000/users',
    };
    endpoint = Backend.SERVICE.PRISMA_USERS;

    constructor(path = Backend.SERVICE.PRISMA_USERS) {
        if (path) this.endpoint = path;
    }

    async getUserById(id) {
        const response = await fetch(`${this.endpoint}?id=${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Failed to fetch user error: ' + response.status);
        return await response.json();
    }
    async getUserByName(name) {
        const response = await fetch(`${this.endpoint}?name=${name}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Failed to fetch user error: ' + response.status);
        return await response.json();
    }
    async getAllUsers() {
        const response = await fetch(this.endpoint, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Failed to fetch users error: ' + response.status);
        return await response.json();
    }

    async add(user) {
        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }) .catch(error => {
            console.error('Error adding user:', error);
            alert('Failed to add user.');
        });
        return await response.json();
    }
    async update(user) {
        const response = await fetch(this.endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (!response.ok) throw new Error('Failed to update user error: ' + response.status);
        return await response.json();
    }
    async delete(id) {
        const response = await fetch(this.endpoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if (!response.ok) throw new Error('Failed to delete user error: ' + response.status);
        return await response.json();
    }
}


//#endregion Classes
