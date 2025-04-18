const calculateTotal = (amount) => {
    let tax =  0.1*amount;
    let total = amount + tax;
    return total;
}

const calculateFinalTotal = (amount) => {
    let tax =  0.1*amount;
    let finalTotal = amount*1.1 + tax;
    return finalTotal;
}


const calculateTotalUsingDry = (amount, includFinal) => {
    let tax =  0.1*amount;
    
    if (includFinal) {
        return  amount * 1.1 + tax;
    }

    return amount + tax;
}
