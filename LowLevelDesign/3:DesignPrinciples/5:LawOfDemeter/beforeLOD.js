class Address {
    constructor(street, city) {
        this.street = street;
        this.city = city;
    }
    getCity() {
        return this.city;
    }
}

class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address; // Has - A (Weak) Relationship with Address
    }
    getAddress() {
        return this.address;
    }
}

class Order{
    constructor(customer) {
        this.customer = customer; // Has - A (Weak) Relationship with Customer
    }
    
    printShippingCity() {
        console.log(this.customer.getAddress().getCity());
    }
}