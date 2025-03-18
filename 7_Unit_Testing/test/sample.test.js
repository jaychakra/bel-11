const { it } = require("node:test");
const {add, subtract} = require("./sample"); 

/*
describe => Defines your test suite
- set of tests to validate a unit


*/


describe("Test addition of 2 numbers", () => {
    test("Should add two positive integers", () => {
        expect(add(1, 2)).toBe(3);
    });
    
    test("Should add two negative integers", () => {
        expect(add(-1, -4)).toBe(-5);
    });

    test("Should have two parameters", () => {
        expect(add(1)).toBe(null);
    });

    test("Should accept numbers only", () => {
        expect(add(1, "jay")).toBe(null);
    });
})


// describe("Test subtraction of 2 numbers", () => {
//     it("should test that true === true", () => {
//         expect(true).toBe(true);
//     });
// })
