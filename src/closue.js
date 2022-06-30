/**
 * Lexical Scope defines how variables names are resolved in nested
 * functions
 *
 * Nested (child) functions have access to the scope of their parent functions
 *
 * This is often confused with closure, but lexical scope is inly an
 * important part of closure
 */

/**
 * ww3schools: "A closure is a function having access to the parent scope,
 * even after the parent function has closed."
 */

/**
 * A closure is created when we define a function not when a function is
 * executed.
 */

// global scope
let x = 1;

const parentFunction = () => {
	// local scope
	let myValue = 2;
	console.log(x);
	console.log(myValue);

	const childFunction = () => {
		console.log((x += 5));
		console.log((myValue += 1));
	};

	return childFunction;
};

const result = parentFunction();
console.log(result);
result();
result();
result();
console.log(x);
//console.log(myValue) // ReferenceError

/**
 * IIFE (Immediately Invoked Function Expression)
 */

const privateCounter = (() => {
	let count = 0;
	console.log(`Initial value: ${count}`);
	return () => {
		count += 1;
		console.log(count);
	};
})();
privateCounter();

const credits = ((num) => {
	let credits = num;
	console.log(`Initial credits value: ${credits}`);
	return () => {
		credits -= 1;
		if (credits >= 0)
			console.log(`playing game, ${credits} credit(s) remaining`);
		if (credits < 0) {
			console.log('not enough credits');
		}
	};
})(3);

credits();
credits();
credits();
credits();

/**
 * Reference: https://www.youtube.com/watch?v=1S8SBDhA7HA
 */
