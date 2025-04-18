interface PaymentProcessor {
    processCreditCardPayment(amount: number): void;
    processDebitCardPayment(amount: number): void;
    processPayPalPayment(amount: number): void;
    processBankTransferPayment(amount: number): void;
}


class CreditCardPaymentProcessor implements PaymentProcessor {
    processCreditCardPayment(amount: number): void {
        console.log(`Processing credit card payment of $${amount}`);
    }
    processDebitCardPayment(amount: number): void {
        throw new Error("Debit card payment not supported");
    }
    processPayPalPayment(amount: number): void {
        throw new Error("PayPal payment not supported");
    }
    processBankTransferPayment(amount: number): void {
        throw new Error("Bank transfer payment not supported");
    }
}

class DebitCardPaymentProcessor implements PaymentProcessor {
    processCreditCardPayment(amount: number): void {
        throw new Error("Credit card payment not supported");
    }
    processDebitCardPayment(amount: number): void {
        console.log(`Processing debit card payment of $${amount}`);
    }
    processPayPalPayment(amount: number): void {
        throw new Error("PayPal payment not supported");
    }
    processBankTransferPayment(amount: number): void {
        throw new Error("Bank transfer payment not supported");
    }
}


// Violation of ISP
// Code would be bloted
// Solution? 
// Split the interfaces into smaller, more specific interface