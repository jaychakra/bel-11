

class PaymentMethod {
    processPayment(amount) {
        throw new Error("Method not implemented");
    }
}

class CreditCardPayment extends PaymentMethod {
    processPayment(amount) {
        console.log("Processing credit card payment");
    }
}
class DebitCardPayment extends PaymentMethod {
    processPayment(amount) {
        console.log("Processing debit card payment");
    }
}
class UpiPayment extends PaymentMethod {
    processPayment(amount) {
        console.log("Processing UPI payment");
    }
}
class NetBankingPayment extends PaymentMethod {
    processPayment(amount) {
        console.log("Processing net banking payment");
    }
}

class BitcoinPayment extends PaymentMethod {
    processPayment(amount) {
        console.log("Processing bitcoin payment");
    }
}

class FreePayment extends PaymentMethod {
    processPayment(amount) {
        throw new Error("Free payment needs no processing");
    }
}


// Developer using this Payment Service
class PaymentService {
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    deductAmount(amount) {
        paymentMethod.processPayment(amount);
    }
}



const CreditCardPayment = new CreditCardPayment();
const paymentService = new PaymentService(CreditCardPayment);
paymentService.deductAmount(1000);

const FreePayment = new FreePayment();

const paymentService2 = new PaymentService(FreePayment);
paymentService2.deductAmount(0);


// The child class should not break existing contract
// They should be interchangeable



// Project Manager comes and says we need to add a new payment method FreePayment