// const car = {
//     make: "Toyota",
//     model: "Camry",
//     year: 2024, 
//     start: function() {
//         console.log(`${this.make} ${this.model} is starting`)
//     },
//     drive: function(speed) {
//         console.log(`${this.make} ${this.model} is running at ${speed}`)
//     } 
// }

// Problem with this approach?
// Lot of code duplication
// Difficult to manage
// Not secure
// There is no uniformity



function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;

    this.start = function() {
        console.log(`${this.make} ${this.model} is starting which was ${this.year}`)
    };
    
    this.drive = function(speed) {
        console.log(`${this.make} ${this.model} is running at ${speed}`)
    }
}

const myCar = new Car("Toyota", "Camry");

myCar.make = "Test";

myCar.start()

myCar.drive(100);


// const brezza = new Car("Maruti", "Brezza", 2023);

// brezza.start();
// brezza.drive(50);


// const nexon = new Car("Tata", "Nexon");

// nexon.start()
// nexon.drive(80);