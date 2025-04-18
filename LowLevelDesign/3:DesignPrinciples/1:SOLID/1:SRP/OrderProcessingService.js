
class OrderProcessingService{
    constructor(paymentService, notificationService){
        this.paymentService = paymentService;
        this.notificationService = notificationService;
    }
    createOrder(order) {
        console.log("Order created:", order);
    }
    processPayment(payment) {
        this.paymentService.processPayment(payment);
    }
    sendEmail(email) {
        this.notificationService.sendEmail(email);
    }
}

class PaymentService {
    processPayment(payment) {
        console.log("Payment processed:", payment);
    }
}

class NotificationService{
    sendEmail(email) {
        console.log("Email sent:", email);
    }
}


const PaymentService = new PaymentService();

