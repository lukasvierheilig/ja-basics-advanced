/**
 * Currying
 *
 * Concept from lambda calculus
 *
 * Currying takes a function that receives more than one parameter
 * and breaks it into a series of unary (single parameter) functions
 *
 * Therefore, a curried function takes only one parameter at a time
 */

/**
 * Currying can look like this:
 */

const buildSandwich = (ingredient1) => {
    return (ingredient2) => {
        return (ingredient3) => {
            return `${ingredient1}, ${ingredient2}, ${ingredient3}`;
        };
    };
};

const mySandwich = buildSandwich('Bacon')('Lettuce')('Tomato');
console.log(mySandwich);

/**
 * It works but thats getting ugly and nested the further we go
 */

/**
 * Lets refactor:
 */

const buildSammy = (ing1) => (ing2) => (ing3) => `${ing1}, ${ing2}, ${ing3}`;

const mySammy = buildSammy('Turkey')('Cheese')('Bread');
console.log(mySammy);

let partialSammy = buildSammy('bacon');
console.log(partialSammy);
partialSammy = partialSammy('lettuce');
console.log(partialSammy);
partialSammy = partialSammy('tomato');
console.log(partialSammy);

/**
 * Another Example of a curried function
 */

const multiply = (x, y) => x * y;

const curriedMultiply = (x) => (y) => x * y;
console.log(multiply(2, 3));
console.log(curriedMultiply(2));
console.log(curriedMultiply(2)(3));

/**
 * Partially applied functions ara a common use of currying
 */

const timesTen = curriedMultiply(10);
console.log(timesTen);
console.log(timesTen(8));

/**
 * Another example
 */

/* const updateElemText = (id) => (content) =>
    (document.querySelector(`#${id}`).textContent = content);

const updateHeaderText = updateElemText('header');
updateHeaderText('Hello World'); */

/**
 * Another common use of currying is function composition.
 * This allows calling small function in a specific order
 */

const addCustomer =
    (fn) =>
    (...args) => {
        console.log('saving customer info...');
        return fn(...args);
    };

const processOrder =
    (fn) =>
    (...args) => {
        console.log(`processing order #${args[0]}`);
        return fn(...args);
    };

let completeOrder = (...args) => {
    console.log(`Order #${[...args].toString()} completed`);
};

completeOrder = processOrder(completeOrder);
console.log(completeOrder);
completeOrder = addCustomer(completeOrder);
completeOrder(1000);

/**
 * Requires a function with fixed number of parameters
 */

const curry = (fn) => {
    return (curried = (...args) => {
        if (fn.length !== args.length) {
            return curried.bind(null, ...args);
        }
        return fn(...args);
    });
};

const total = (x, y, z) => x + y + z;
const curriedTotal = curry(total);

console.log(curriedTotal(10)(20)(30));

/**
 * Reference: https://www.youtube.com/watch?v=I4MebkHvj8g
 */
