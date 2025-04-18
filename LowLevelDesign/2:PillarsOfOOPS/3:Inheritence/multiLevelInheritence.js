// Multi level inheritence

class Animal {

    #name;
    
    constructor (name, sound) {
        this.#name = name;
        this.sound= sound;
    }

    speak() {
        console.log(`${this.#name} says ${this.sound}`);
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }
}


class Mammal extends Animal {
    constructor(name, sound, type) {
        super(name, sound);
        this.type = type;
    }

    breathe() { 
        console.log(`${this.name} breathes oxygen`);
    }
}


class Human extends Mammal {
    constructor(name) {
        super(name, "blabber", "wild");
    }

    speak() {
        super.speak();
        console.log(`Human  speaks politely`);
    }

}


// const mammal = new Mammal("Cat", "meow", "domestic");

// mammal.speak();

const jay = new Human("Jay");

jay.speak();






