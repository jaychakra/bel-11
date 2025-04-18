class Car {
    #make;

    constructor(make, model, year) {
        this.#make = make;
        this.model = model;
        this.year = year;
        Object.freeze(this);
    }



    start = function() {
        this.#injectFuel();
        this.#igniteSparkPlug();
        // inject fuel
        // ignite the spark plug


        console.log(`${this.#make} ${this.model} is starting which was ${this.year}`)
        console.log(`${this.make} ${this.model} is starting which was ${this.year}`)
    }
    
    #injectFuel() {
        console.log(`${this.#make} ${this.model} is adding 10 ml of fuel in the engine`)
    }

    #igniteSparkPlug() {
        console.log(`${this.#make} ${this.model} is setting fire to the fuel`)
    }


    drive = function(speed) {
        console.log(`${this.#make} ${this.model} is running at ${speed}`)
        console.log(`${this.make} ${this.model} is running at ${speed}`)
    }

  
    setMake = function (make) {
        this.#make = make;
    }
}

const myCar = new Car("Toyota", "Camry");




myCar.model = "Breeza";