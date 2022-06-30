/**
 * IIFE - Immediately-Invoked Function Expression
 */

/**
 * Vairations:
 *
 * with anonymous arrow function inside:
 */

(() => {
	// do stuff
})();

/**
 * with the function keyword:
 */
(function () {
	// do stuff
})();

/**
 * with a function name (allows for recursion)
 */
(function myIIFE(num = 0) {
	num++;
	console.log(num);
	return num !== 5 ? myIIFE(num) : console.log('finisched');
})();

/**
 * Reason 1) Does not pollute the global object namespace
 */

// global
const x = 'whatever';

const helloWorld = () => 'Hello World!';

// isolate declaration within the function
(() => {
	const x = 'iife whatever';
	const helloWorld = () => 'Hello IIFE!';
	console.log(x);
	console.log(helloWorld());
})();

console.log(x);
console.log(helloWorld());

/**
 * Reason 2) Private Variables and Methods from Closures
 */

const increment = (() => {
	let counter = 0;
	console.log(counter);
	const credits = (num) => console.log(`I have ${num} credit(s)`);
	return () => {
		counter++, credits(counter);
	};
})();

increment();
increment();
increment();
increment();
increment();

/**
 * Reason 3) The Module Pattern
 */

const Score = (() => {
	let count = 0;
	return {
		current: () => {
			return count;
		},
		increment: () => {
			count++;
		},
		reset: () => {
			count = 0;
		},
	};
})();

console.log(Score.current());
Score.increment();
console.log(Score.current());
Score.reset();
console.log(Score.current());

/**
 * The Revealing Pattern is a variation of the Module Pattern
 */

const Game = (() => {
	let count = 0;
	const current = () => {
		return `Game score is ${count}.`;
	};
	const increment = () => {
		count++;
	};
	const reset = () => {
		count = 0;
	};

	// reveals private functions as object
	return {
		current: current,
		increment: increment,
		reset: reset,
	};
})();

Game.increment();
console.log(Game.current());

/**
 * Injecting a namespace object
 */
const initApp = () => {
	((namespace) => {
		namespace.count = 0;
		namespace.current = function () {
			return `App count is ${this.count}.`;
		};
		namespace.increment = function () {
			this.count++;
		};
		namespace.reset = function () {
			this.count = 0;
		};
	})((window.App = window.App || {}));

	App.increment();
	console.log(App.current());
};

document.addEventListener('DOMContentLoaded', initApp);

/**
 * Reference: https://www.youtube.com/watch?v=8GDk8sj0YgQ
 */
