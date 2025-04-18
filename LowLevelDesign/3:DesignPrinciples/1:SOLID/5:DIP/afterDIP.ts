interface Engine {
    start(): void;
}

class Engine {
    private type;
    constructor(type: string) {
        this.type = type;
    }
    // OCP ==> Strategy Pattern yhere
    start() {
        console.log(`${this.type} engine started`);
    }
}

class PetrolEngine implements Engine {
    start() {
        console.log("Petrol engine started");
    }
}   

class DieselEngine implements Engine {
    start() {
        console.log("Diesel engine started");
    }
}

class CNGEngine implements Engine {
    start() {
        console.log("CNG engine started");
    }
}

class Car {
    private engine: Engine; // High-level module depends on an abstraction (interface) instead of a concrete class
    constructor(engine: Engine) {
        this.engine = engine; // Dependency Injection
    }
    startCar() {
        this.engine.start();
        console.log("Car started");
    }
}

// Dependency Inversion is achieved via Dependency Injection

let PetrolEngine = new PetrolEngine();

let marutiCar = new Car(PetrolEngine);
marutiCar.startCar(); // Output: Petrol engine started, Car started
let BMWCar = new Car(new DieselEngine());
BMWCar.startCar(); // Output: Diesel engine started, Car started