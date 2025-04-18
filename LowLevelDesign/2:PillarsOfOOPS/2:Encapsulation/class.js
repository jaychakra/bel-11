// function Car(make, model, year) {
//     this.make = make;
//     this.model = model;
//     this.year = year;

//     this.start = function() {
//         console.log(`${this.make} ${this.model} is starting which was ${this.year}`)
//     };
    
//     this.drive = function(speed) {
//         console.log(`${this.make} ${this.model} is running at ${speed}`)
//     }
// }

// Default behaviour is public

// Vehicle



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
// myCar.#injectFuel();

// myCar.setMake("Tata");

// // Private #make
// // Adding Public make 

// // myCar.model = 

// // console.log("Before", myCar);

// myCar.make = "Test";

// console.log("After", myCar);


myCar.start()
myCar.drive(100);

