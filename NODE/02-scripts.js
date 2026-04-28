
//#region Classes
/*
model User { 
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  email String  @unique
  name  String?
  age   Int?
} 
*/
class User {
    constructor(id = '', email = '', name = '', age = 0) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.age = age;
    }
    hasId = () => this.id && this.id.trim() !== '';
    isValid = () => validateUserData(this);
    json = () => ({ id: this.id, email: this.email, name: this.name, age: this.age });
}

function validateUserData(user) {
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
//#endregion Classes

//#region Functions
