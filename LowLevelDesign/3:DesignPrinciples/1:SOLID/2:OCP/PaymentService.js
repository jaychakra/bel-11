class PaymentService {
    deductAmount(paymentType, amount) {
        if (paymentType=="creditCard") {
            console.log("Processing credit card payment");
        } else if(paymentType=="debitCard") {
            console.log("Processing debit card payment");
        } else if (paymentType=="upi") {
            console.log("Processing UPI payment");
        } else if (paymentType=="netBanking") {
            console.log("Processing net banking payment");
        } else {
            console.log("Invalid payment type");
        }    
    }
}

// OCP ==> Open for extension, closed for modification


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

class PaymentService {
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    deductAmount(amount) {
        paymentMethod.processPayment(amount);
    }
}

// I have to add addition payment methods Bitcoin

const CreditCardPayment = new CreditCardPayment();
const DebitCardPayment = new DebitCardPayment();
const UpiPayment = new UpiPayment();

const paymentService = new PaymentService(CreditCardPayment);

paymentService.deductAmount(1000);



