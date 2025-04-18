// OrderService
// Persisted ==> created in a db
// Paymentis made
// Email

class OrderProcessingService {
    createOrder(order) {
        // logic to create order
        // Validation of Order
        // Handle storage on the DB
        // Invalidation of cache

        console.log("Order created:", order);
    }
    processPayment(payment) {
        // logic to process payment
        // Identify the flow, CC, DB, UPI, Netbanking
        // Call PG
        // Process the response
        // Maintain the state in DB
        console.log("Payment processed:", payment);
    }
    sendEmail(email) {
        // logic to send email
        // Start your SMTP server
        // Fetch a template of email
        // fill the template with customer and order details
        // send the email
        // create a db entry for status
        console.log("Email sent:", email);
    }
}


// violates SRP
// Use relationships
