// Segregated Interfaces

interface CreditCardPaymentProcessor {
    processCreditCardPayment(amount: number): void;
}

interface DebitCardPaymentProcessor {
    processDebitCardPayment(amount: number): void;
}

interface PayPalPaymentProcessor {
    processPayPalPayment(amount: number): void;
}

interface BankTransferPaymentProcessor {
    processBankTransferPayment(amount: number): void;   
}

interface UPIPaymentProcessor {
    processUPIPayment(amount: number): void;
} 
class CreditCardPayment implements CreditCardPaymentProcessor {
    processCreditCardPayment(amount: number): void {
        console.log(`Processing credit card payment of $${amount}`);
    }
}


class DebitCardPaymentProcessor implements DebitCardPaymentProcessor {
    processDebitCardPayment(amount: number): void {
        console.log(`Processing debit card payment of $${amount}`);
    }
}   

class RazorPayGateway implements CreditCardPaymentProcessor, DebitCardPaymentProcessor, BankTransferPaymentProcessor, UPIPaymentProcessor {
    processCreditCardPayment(amount: number): void {
        console.log(`Processing credit card payment of $${amount}`);
    }
    processDebitCardPayment(amount: number): void {
        console.log(`Processing debit card payment of $${amount}`);
    }
}