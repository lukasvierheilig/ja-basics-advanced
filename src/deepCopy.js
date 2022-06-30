/**
 * Javascript Data Types
 *
 * Primitive vs Structural
 *
 * Primitives:
 * 1) undefined
 * 2) Boolean
 * 3) Number
 * 4) String
 * 5) BigInt
 * 6) Symbol
 *
 * Structural:
 * 1) Object: (new) Object, Array, Map, Set, WeakMap, Date etc.
 * 2) Function
 */

/**
 * Value vs Reference
 * Primitives pass values:
 */

let x = 2;
let y = x;
y += 1;
console.log(y);
console.log(x);

/**
 * Structural types use references:
 */

let xArray = [1, 2, 3];
let yArray = xArray;
yArray.push(4);
console.log(yArray);
console.log(xArray);

/**
 * Mutable vs Immutable
 */

/**
 * Primitives are immutable
 */

let myName = 'Lukas';
myName[0] = 'l'; // nope!
console.log(myName);

/**
 * Reassignment is not the same as mutable
 */

myName = 'Dave';
console.log(myName);

/**
 * Structures contain mutable data
 */

yArray[0] = 9;
console.log(yArray);
console.log(yArray);

/**
 * Pure Functions require you to avoid mutating the data
 */

/**
 * Impure function that mutates the data
 */

const addToScoreHistory = (array, score) => {
    array.push(score);
    return array;
};

const scoreArray = [44, 23, 12];
console.log(addToScoreHistory(scoreArray, 14));

/**
 * This mutates the original array.
 * This is considered to be a side-effect
 */

/**
 * Notice: "const" does not make the array immutable
 */

/**
 * We need to modify our function so it does not mutate the original data.
 */

/**
 * Shallow copy vs. Deep copy (clones)
 */

/**
 * Shallow copy
 */

const zArray = [...yArray, 10];
console.log(zArray);
console.log(yArray);

console.log(xArray === yArray);
console.log(yArray === zArray);

/**
 * With Object.assign()
 */

const tArray = Object.assign([], zArray);
console.log(tArray);
console.log(tArray === zArray);
tArray.push(11);
console.log(tArray);
console.log(zArray);

/**
 * But if there are nested arrays of objects...
 */

yArray.push([8, 9, 10]);
console.log(yArray);
const vArray = [...yArray];
console.log(vArray);
console.log(yArray === vArray);
vArray[4].push(11);
console.log(vArray);
console.log(yArray);

/**
 * Note: Array.from() and Array.slice() create shallow copies, too.
 */

/**
 * When it comes to objects, what about...
 * ...Object.freeze() ??
 */

const scoreObj = {
    first: 44,
    second: 12,
    third: { a: 1, b: 2 },
};

Object.freeze(scoreObj);
scoreObj.third.a = 8;
console.log(scoreObj);

/**
 * Object.freeze(), also does not work recursively
 */

/**
 * Deep copy is needed to avoid this
 */

/**
 * Here is a one line Vanilla JS (hacky) solution,
 * but it does not work with Dates, functions, undefined, Infinity, RegEx,
 * Maps, Sets, Blobs, FileLists, ImageData, and other complex data types
 */

const newScoreObj = JSON.parse(JSON.stringify(scoreObj));
newScoreObj.third.a = 1;
console.log(newScoreObj);

/**
 * Note: JSON.stringify loses the types of data mentioned above
 */

/**
 * Instead of using a library, here is a Vanilla JS function
 */

const deepClone = (obj) => {
    // JS quirk: typeof null is object
    if (typeof obj !== 'object' || obj == null) return obj;

    // Creates an array or object to hold the values
    const newObject = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        const value = obj[key];
        // recursive call for nested objects
        newObject[key] = deepClone(value);
    }

    return newObject;
};

const newScoreArray = deepClone(scoreArray);
console.log(newScoreArray);
console.log(newScoreArray === scoreArray);

const myScoreObj = deepClone(scoreObj);
console.log(myScoreObj);
console.log(myScoreObj == scoreObj);

/**
 * Now we can make pure functions
 */

const pureAddToScoreHistory = (array, score, cloneFunc) => {
    const newArray = cloneFunc(array);
    newArray.push(score);
    return newArray;
};

const newScoreHistory = pureAddToScoreHistory(scoreArray, 18, deepClone);
console.log(newScoreHistory);
console.log(scoreArray);

/**
 * Review:
 *
 * Primitive vs Structural Data Types
 *
 * Primitive data types passed by value
 *
 * Structural data types passed by reference
 *
 * Primitive data types are immutable
 *
 * Reassignment is not the same as mutation
 *
 * Structural data types contain mutable data
 *
 * Shallow copy vs. Deep copy (clones of data structures)
 *
 * Shallow copies still share references of nested structures
 * which allows for mutation of the original data
 *
 * Object.freeze() creates a shallow freeze
 *
 * Deep copies share no references!
 *
 *
 * All of this is important to know when constructing Pure Functions
 * because they require you to avoid mutating the original data
 *
 */

/**
 * Reference: https://www.youtube.com/watch?v=4Ej0LwjCDZQ
 */
