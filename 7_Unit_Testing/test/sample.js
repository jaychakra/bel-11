const add = (a, b) => {
    if(!a || !b) {
        return null;
    }

    if(typeof a !== "number" || typeof b !== "number") {
       return null;
    }

    return a + b;
}  

const subtract = (a, b) => a - b;
module.exports = {add, subtract};


