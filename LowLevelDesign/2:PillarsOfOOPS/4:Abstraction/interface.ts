class Vehicle {
    public make;
    public model;
    public name;
    constructor(name: string, make: string, model: string) {
        this.make = make;
        this.model = model;
        this.name = name;
    }

    openGates(): void {
        console.log(`${this.make} ${this.model} gates are opening`);
    }
}


interface Drivable {
    // Properties
    // lane: string;
    // model: string;


    start(): void;
    stop(): void;
    accelerate(): void;     
    brake(): void;
}

interface Flyable  extends Drivable {
    takeOff(): void;
    land(): void;
    fly(): void;
    hover(): void;
}

class RoboTaxi extends Vehicle implements Drivable, Flyable {
    // lane: string;
    constructor(name: string, make: string, model: string) {
        super(name, make, model);
        // this.lane = "left";
    }

    start(): void {
        console.log(`${this.make} ${this.model} is starting`);
    }
    stop(): void {
        console.log(`${this.make} ${this.model} is stopping`);
    }
    accelerate(): void {        
        console.log(`${this.make} ${this.model} is accelerating`);
    }       
    brake(): void {
        
    }
    takeOff(): void {
        console.log(`${this.make} ${this.model} is taking off`);
    }
    land(): void {
        console.log(`${this.make} ${this.model} is landing`);
    }
    fly(): void {
        console.log(`${this.make} ${this.model} is flying`);
    }   

    hover(): void {
        console.log(`${this.make} ${this.model} is hovering`);
    }

}



class Car extends Vehicle implements Drivable {
    constructor(name: string, make: string, model: string) {
        super(name, make, model);
    }

    start(): void {
        console.log(`${this.make} ${this.model} is starting`);
    }

    stop(): void {
        console.log(`${this.make} ${this.model} is stopping`);
    }

    accelerate(): void {
        console.log(`${this.make} ${this.model} is accelerating`);
    }

    brake(): void {
        console.log(`${this.make} ${this.model} is braking`);
    }
}



