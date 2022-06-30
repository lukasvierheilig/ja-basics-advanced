/**
 * Pure Functions
 *
 * Functional Programming Paradigm
 *
 * Why write Pure Functions?
 * 1) Clean Code
 * 2) Easy to test
 * 3) Easy to debug
 * 4) Decoupled and Independent
 * 5) Could be added to utility functions
 *
 * Rules for Pure Functions:
 * 1) The same input ALWAYS gives the same output
 */

const add = (x, y) => x + y;
console.log(add(2, 3));

const fullName = (first, last) => `${first} ${last}`;
console.log(fullName('Lukas', 'Vierheilig'));

/**
 * We can replace the function with the output
 * This is called "referential transparency"
 */

/**
 * A pure function should have at least one parameter.
 *
 * Otherwise, it is the same as a constant because they can only work with their input (no side effects).
 */

const firstName = () => 'Lukas';

/**
 * 2) No side effects:
 */

/**
 * This also means accessing the scope outside the function makes the function impure
 */

const z = 5;
const sum = (x, y) => x + y + z;
console.log(sum(2, 2));

/**
 * Pure functions cannot:
 * Access a database, API, file system, storage, etc.
 * Modify the DOM
 * Or even log to the console
 */

/**
 * Clearly, "impure" functions are necessary but they are harder to test and debug
 */

/**
 * Further, no input state can be modified
 * That is, no data should be "mutated"
 * Consider all input data to be >>immutable<<
 */

/**
 * Impure Example 1:
 * Primitiv data - passed by value
 */

let x = 1;
const increment = () => (x += 1);
console.log(increment());
console.log(x);

/**
 * Impure Example 2:
 * Structural data - passed by reference
 */

const myArray = [1, 2, 3];
const addToArray = (array, data) => {
    array.push(data);
    return array;
};
console.log(addToArray(myArray, 4));
console.log(myArray);

/**
 * Refactored Example 1:
 */

const pureIncrement = (num) => (num += 1);
console.log(pureIncrement(x));
console.log(x);

/**
 * Refactored Example 2:
 * shallow copy array before pushing onto copy
 */

const pureAddToArray = (array, data) => [...array, data];
console.log(pureAddToArray(myArray, 5));
console.log(myArray);

/**
 * Pure functions always return something.
 */

/**
 * These Higher Order Functions are Pure Functions:
 */

const oneToFive = [1, 2, 3, 4, 5];
const oddToFive = oneToFive.filter((elem) => elem % 2 !== 0);
console.log(oddToFive);

const doubled = oneToFive.map((elem) => elem * 2);
console.log(doubled);

const summed = oneToFive.reduce((acc, elem) => acc + elem);
console.log(summed);

/**
 * Review the Rules of Pure Functions:
 * 1) The same input ALWAYS gives the same output
 * 2) No side effects (no mutations!)
 */

/**
 * The goal: Write small, pure functions when you can for code
 * that is clean, easy to test, and easy to debug
 */

/**
 * Reference: https://www.youtube.com/watch?v=ZXxahQS1PN8
 */
