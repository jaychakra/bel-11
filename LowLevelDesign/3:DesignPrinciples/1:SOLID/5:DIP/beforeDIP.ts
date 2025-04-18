class PetrolEngine {
    start() {
        console.log("Petrol engine started");
    }
}

// High level module which depends on a low level module called PetrolEngine
// Directly dependent on the PetrolEngine class
// This is a violation of the Dependency Inversion Principle (DIP)


class Car {
    private engine: PetrolEngine;
    constructor() {
        this.engine = new PetrolEngine();           // HAS-A Relationship (Aggregation/composition)
    }

    startCar() {
        this.engine.start();
        console.log("Car started");
    }
}




