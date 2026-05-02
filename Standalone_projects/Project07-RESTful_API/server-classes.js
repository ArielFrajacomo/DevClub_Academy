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
        showMessage(errorMessages.join('\n'));
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
        RENDER: 'https://devclub-academy.onrender.com/users',
        LOCALHOST: 'http://localhost:3000/users'
    };
    endpoint = Backend.SERVICE.LOCALHOST; // default endpoint

    constructor(path = Backend.SERVICE.LOCALHOST) {
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
            showMessage('Failed to add user.');
        });
        if (response.ok) showMessage('User added successfully!', 'success');
        return await response.json();
    }
    async update(user) {
        if (user.id === '69ef545dd6c918256c47c58d') { 
            //easteregg, no one can delete me, not even me, the creator
            showMessage('This user is too powerful and cannot be changed!', 'error');
            return;
        }

        const response = await fetch(this.endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            showMessage('Failed to update user.');
            throw new Error('Failed to update user error: ' + response.status);
        }
        showMessage('User updated successfully!', 'success');
        return await response.json();
    }
    async delete(id) {
        if (id === '69ef545dd6c918256c47c58d') { 
            //easteregg, no one can delete me, not even me, the creator
            showMessage('This user is too powerful to be deleted!', 'error');
            return;
        }

        const response = await fetch(this.endpoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if (!response.ok) {
            showMessage('Failed to delete user.');
            throw new Error('Failed to delete user error: ' + response.status);
        }
        showMessage('User deleted successfully!', 'success');
        return await response.json();
    }
}

export function showMessage(text, type = 'error') {
    let msg = document.getElementById('message');
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'message';
        document.body.appendChild(msg);  
        
        addShowMessageCSS();
    }

    msg.textContent = text;
    msg.className = `message ${type}`;
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 4000);
}

export function addShowMessageCSS() {
    if (document.getElementById('showMessageStyles')) return;

    const style = document.createElement('style');
    style.id = 'showMessageStyles';
    style.type = 'text/css';
    style.textContent = `
        .message {
            position: fixed;
            top: 20px;
            right: 20px;
            transform: translateX(0);
            background: rgba(20, 20, 20, 0.95);
            border: 2px solid var(--accent);
            color: var(--accent);
            padding: 14px 28px;
            border-radius: 12px;
            font-weight: 600;
            text-align: center;
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
            z-index: 1000;
            min-width: 280px;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
        }

        .message.show {
            opacity: 1;
            pointer-events: auto;
        }

        .message.error {
            border-color: #ff5555;
            color: #ff5555;
        }

        .message.success {
            border-color: #4ade80;
            color: #4ade80;
        }`;
    document.body.appendChild(style);
}
//#endregion Classes
