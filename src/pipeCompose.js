/**
 * Functional Programming
 *
 * Often uses pipe compose = higher order functions
 *
 * A higher order function is any function which takes a function as an argument,
 * returns a function, or both.
 */

/**
 * Here's how a "compose" function works:
 *
 * Start small with unary (on parameter/argument) functions
 */

const add2 = (x) => x + 2;
const subtract1 = (x) => x - 1;
const multiplyBy5 = (x) => x * 5;

/**
 * Notice how the functions execute from the inside to out & right to left
 */

const result = multiplyBy5(subtract1(add2(4)));
console.log(result);

/**
 * The above is NOT a composed function - let's make one
 */

/**
 * Making our own compose and pipe function
 */

/**
 * The higher order function "reduce" takes a list of values and applies a
 * function to each of these values, accumulating a single result.
 */

/**
 * To get the compose order from right to left as we see with nested
 * function calls in our example above, we need reduceRight...
 */

const compose =
	(...fns) =>
	(val) =>
		fns.reduceRight((prev, fn) => fn(prev), val);

const compResult = compose(multiplyBy5, subtract1, add2)(4);
console.log(compResult);

/**
 * To do the same, but read from left to right... we use "pipe".
 * It is the same except uses reduce instead of reduceRight
 */

const pipe =
	(...fns) =>
	(val) =>
		fns.reduce((prev, fn) => fn(prev), val);

const pipeResult = pipe(add2, subtract1, multiplyBy5)(5);
console.log(pipeResult);

/**
 * This is a "pointer free" style where you do not see the unary parameter
 * passes between each function
 */

//example with a 2nd parameter
const divideBy = (divisor, num) => num / divisor;

const pipeResult3 = pipe(add2, subtract1, multiplyBy5, (x) => divideBy(2, x))(
	5,
);
console.log(pipeResult3);

/**
 * Or you could curry the divideBy function for a custom unary function
 */

const divBy = (divisor) => (num) => num / divisor;
const divideBy2 = divBy(2); //partially applied

const pipeResult4 = pipe(add2, subtract1, multiplyBy5, divideBy2)(5);
console.log(pipeResult4);

/**
 * Lets look at some examples beyond math functions
 */

const lorem =
	'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

const splitOnSpace = (string) => string.split(' ');
const count = (array) => array.length;

const wordCount = pipe(splitOnSpace, count);

console.log(wordCount(lorem));

/**
 * Combining Processes: Check for palindrome
 */

const pal1 = 'taco cat';
const pal2 = 'Ufo tofu';
const pal3 = 'Dave';

const split = (string) => string.split('');
const join = (string) => string.join('');
const lower = (string) => string.toLowerCase();
const reverse = (array) => array.reverse();

const fwd = pipe(splitOnSpace, join, lower);
const rev = pipe(fwd, split, reverse, join);

const palCheck = (string) => fwd(string) === rev(string);

console.log(palCheck(pal1));
console.log(palCheck(pal2));
console.log(palCheck(pal3));

/**
 * Clone / Copy functions within a pipe or compose function
 *
 * 3 approaches:
 *
 * 1) clone the object before a impure function mutates it
 */

const scoreObj = { home: 0, away: 0 };

const shallowClone = (obj) => (Array.isArray(obj) ? [...obj] : { ...obj });

const incrementHome = (obj) => {
	obj.home += 1;
	return obj;
};
const homeScore = pipe(
	shallowClone,
	incrementHome,
	// another function,
	// and another function, etc
);

console.log(homeScore(scoreObj));
console.log(scoreObj);

/**
 * Positive: Fewer function calls
 * Negative: Create impure functions and testing difficulties
 */

/**
 * 2) Curry the function to create a partial that is unary
 */

let incrementHomeB = (cloneFn) => (obj) => {
	const newObj = cloneFn(obj);
	newObj.home += 1;
	return newObj;
};

incrementHomeB = incrementHomeB(shallowClone);

const homeScoreB = pipe(
	incrementHomeB,
	// another function,
	// and another function, etc
);

console.log(homeScoreB(scoreObj));
console.log(scoreObj);

/**
 * Positive: Pure function with clear dependencies
 * Negative: More calls to the cloning function
 */

/**
 * 3) Insert the clone function as a dependency
 */

const incrementHomeC = (obj, cloneFn) => {
	const newObj = cloneFn(obj);
	newObj.home += 1; // mutation
	return newObj;
};

const homeScoreC = pipe(
	(x) => incrementHomeC(x, shallowClone),
	// another function,
	// and another function, etc
);

console.log(homeScoreC(scoreObj));
console.log(scoreObj);

/**
 * Positive: Pure function with clear dependencies
 * Negative: More calls to the cloning function
 * and not only unary functions in the pipe
 */

/**
 * Reference: https://www.youtube.com/watch?v=kclGXphtmVg
 */
