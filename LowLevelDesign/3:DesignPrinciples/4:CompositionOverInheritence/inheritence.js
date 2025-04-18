// Have a Duck
// Behaviours? Swim, Walk, Fly, Quack
// System of Ducks


class Duck {
    constructor(name) {
        this.name = name;
    }

    swim() {
        console.log(`${this.name} is swimming`);
    }

    walk() {
        console.log(`${this.name} is walking`);
    }

    quack() {
        console.log(`${this.name} is quacking`);
    }

    fly() {
        console.log(`${this.name} is flying`);
    }
}

class LakeDuck extends Duck {
    constructor(name) {
        super(name);
    }
    fly() {
        console.log(`Lake Duck ${this.name} is flying`);
    }
}


// PM comes and says we need to add a new duck type called RubberDuck 

// LSP, ISP
class RubberDuck extends Duck {
    constructor(name) {
        super(name);
    }

    swim() {
        throw new Error("RubberDuck can't swim. It floats");
    }

    quack() {
        throw new Error("RubberDuck can't quack");
    }

    fly() {
        throw new Error("RubberDuck can't fly");
    }
    walk() {
        throw new Error("RubberDuck can't walk");
    }

}

