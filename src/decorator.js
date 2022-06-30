/**
 * Javascript Decorator Functions
 *
 * Decorators wrap a function in another function
 *
 * These wrappers "decorate" the original function
 * with new capabilities
 *
 * Concept not exclusive to JavaScript
 *
 * Benefits: D.R.Y. and clean code through composition
 */

const initApp = () => {
	/**
	 * Example1:
	 * Using closure to log how many times a function is called
	 */

	let sum = (...args) => {
		return [...args].reduce((acc, num) => acc + num);
	};

	const callCounter = (fn) => {
		let count = 0;

		return (...args) => {
			//write to logs, console, db, etc
			console.log(`sum has been called ${(count += 1)} times`);
			return fn(...args);
		};
	};

	sum = callCounter(sum);

	console.log(sum(2, 3, 5));
	console.log(sum(1, 5));
	console.log(sum(14, 5));

	/**
	 * Example 2:
	 * Check for valid data and number of params
	 */

	let rectangleArea = (length, width) => {
		return length * width;
	};

	// FIXME: false negatives!
	const countParams = (fn) => {
		return (...params) => {
			if (params.length !== fn.length) {
				throw new Error(
					`Incorrect number of parameters for ${fn.name}`,
				);
			}
			return fn(...params);
		};
	};

	const requireInteger = (fn) => {
		const name = fn.name;
		return (name, ...params) => {
			params.forEach((param) => {
				if (!Number.isInteger(param)) {
					throw new TypeError(`Params for ${name} must be integers`);
				}
			});
			return fn(...params);
		};
	};

	rectangleArea = countParams(rectangleArea);
	rectangleArea = requireInteger(rectangleArea);

	console.log(rectangleArea(20, 30));
	//console.log(rectangleArea(20, 30, 40));
	//console.log(rectangleArea(20, 'hello'));

	/**
	 * Example 3:
	 * Decorate an async API call function:
	 * Time data requests during development
	 */

	let requestsData = async (url) => {
		try {
			const data = await (await fetch(url)).json();
			return data;
		} catch (err) {
			console.error(err);
		}
	};

	const dataResponseTime = (fn) => {
		return async (url) => {
			console.time('fn');
			const data = await fn(url);
			console.timeEnd('fn');
			return data;
		};
	};

	const myTestFunction = async () => {
		requestsData = dataResponseTime(requestsData);
		const data = await requestsData(
			`https://jsonplaceholder.typicode.com/posts`,
		);
		console.log(data);
	};

	myTestFunction();
};

document.addEventListener('DOMContentLoaded', initApp);

/**
 * Reference: https://www.youtube.com/watch?v=wYs3rv_KFvk
 */
