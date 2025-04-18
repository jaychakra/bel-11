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
    constructor(name, address, shippingAddress) {
        this.name = name;
        this.address = address; // Has - A (Weak) Relationship with Address
        this.shippingAddress = shippingAddress;
    }
    getAddress() {
        return this.address;
    }

    getShippingCity() {
        return this.shippingAddress.getCity();
    }
}


class Order{
    constructor(customer) {
        this.customer = customer; // Has - A (Weak) Relationship with Customer
    }
    
    printShippingCity() {
        console.log(this.customer.getShippingCity());
    }
}

// Order has customer

