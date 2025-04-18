// A relationship between two entities (A-relationship)
// Each of the entities can exist independently

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    openAccount(bank) {
        console.log(`${this.name} opened an account in ${bank.name}`);
    }
}

class Bank {
    constructor(name, location) {   
        this.name = name;   
        this.location = location;
    }

    provideLoan(person) {
        console.log(`${this.name} provided a loan to ${person.name}`);
    }
}


const jay = new Person("Jay", 25);
const ICICI = new Bank("ICICI", "Mumbai");

jay.openAccount(ICICI);

ICICI.provideLoan(jay);

// Both can exist independently but they can also interact with each other via object passing
// The Bank object doesn't have a representation of person and vice versa

