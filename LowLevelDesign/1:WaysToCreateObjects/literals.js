
// properties

// Defining by literals
const car = {
    make: "Toyota",
    model: "Camry",
    year: 2024, 
    start: function() {
        console.log(`${this.make} ${this.model} is starting`)
    },
    drive: function(speed) {
        console.log(`${this.make} ${this.model} is running at ${speed}`)
    } 
}


car.start()

car.drive(100);

// Problem with this approach?
// Lot of code duplication
// Difficult to manage
// Not secure
// There is no uniformity


