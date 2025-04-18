const processOrder = (order) => {
    if (order.isValid()) {
        if (order.getItems().size() > 0) {
            for (item of order.getItems()) {
                if(item.isAvailale()) {
                    item.process();
                } else {
                    item.removeFromCart();
                }
            }

            order.confirm()
        }
        else {
            order.cancel();
        }
    }

} 

const processOrderUsingKISS = (order) => {
    if (!order.isValid()) return;   // Fail Fast

    if (order.getItems().size() === 0) { // Fail Fast
        order.cancel();
        return;
    }
    
    processItems(order.getItems());
    
    order.confirm()
}


const processItems = (items) => {
    for (item of items) {
        item.isAvailale() ? item.process() : item.removeFromCart();
    }
} 