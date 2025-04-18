class QuackBehaviour {
    quack() {
        console.log("Quack");
    }
}

class FlyBehaviour {    
    fly() {
        console.log("I can fly");
    }
}

class SwimBehaviour {
    swim() {
        console.log("I can swim");
    }
}

class WalkBehaviour {
    walk() {
        console.log("I can walk");
    }
}

class Duck {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return `The name of this duck is ${this.name}`;
    }
}

class SqueakBehaviour {
    quack() {
        console.log("Squeak");
    }
}

class LakeDuck extends Duck {
    constructor(name, quackBehaviour, flyBehaviour, swimBehaviour, walkBehaviour) {
        super(name);
        this.quackBehaviour = quackBehaviour;
        this.flyBehaviour = flyBehaviour;
        this.swimBehaviour = swimBehaviour;
        this.walkBehaviour = walkBehaviour;
    }

    performSwim() {
        this.swimBehaviour.swim();
    }
    performWalk() {
        this.walkBehaviour.walk();
    }
    performQuack() {
        this.quackBehaviour.quack();
    }
    performFly() {
        this.flyBehaviour.fly();
    }
}

class RubberDuck extends Duck {
    constructor(name, quackBehaviour) {
        super(name);
        this.quackBehaviour = quackBehaviour;
    }

    performQuack() {
        this.quackBehaviour.quack();
    }
}

const squeakBehaviour = new SqueakBehaviour();
let LakeDuck = new LakeDuck("Lake Duck", new QuackBehaviour(), new FlyBehaviour(), new SwimBehaviour(), new WalkBehaviour());


let rubberDuck = new RubberDuck("Rubber Duck", new squeakBehaviour);
