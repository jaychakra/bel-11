class Vehicle {
    make: string;
    model: string;

  constructor(public name: string, make: string, model: string) {
    this.make = make;
    this.model = model;
  }

  abstract start(): void

  abstract stop(): void 

  accelerate(): void {  
    console.log(`${this.make} ${this.model} is accelerating`);
  }
}   


class PetrolVehicle extends Vehicle {
  constructor(name: string, make: string, model: string) {
    super(name, make, model);
  }

  start(): void {
    console.log(`${this.make} ${this.model} is starting with petrol`);
  }
}


class ElectricVehicle extends Vehicle {
  constructor(name: string, make: string, model: string) {
    super(name, make, model);
  }

  start(): void {
    console.log(`${this.make} ${this.model} is starting with electricity`);
  }
}

class HybridVehicle extends Vehicle {
  constructor(name: string, make: string, model: string) {
    super(name, make, model);
  }

  start(): void {
    console.log(`${this.make} ${this.model} is starting with both petrol and electricity`);
  }
}








