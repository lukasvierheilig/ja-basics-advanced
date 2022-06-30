const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const initApp = async () => {
	getPostSerializedReduce(ids);
};

document.addEventListener('DOMContentLoaded', initApp);

/**
 * ForEach does not return anything instead of other higher order functions
 * like map, reduce, filter etc.
 * Therefore you can not await any promise of the forEach loop.
 */

const useForEach = (ids) => {
	ids.forEach(async (element) => {
		const response = await getPost(element);
		console.log(response);
	});
	console.log("I'm not waiting");
};

/**
 * Returns requests in order
 */
const getPostSerialized = async (ids) => {
	for (let i = 0; i < ids.length; i++) {
		const data = await getPost(ids[i]);
		console.log(data);
	}
	console.log("I'm waiting on you");
};

/**
 * Still serialized but without tedious for loop
 */
const betterGetPostSerialized = async (ids) => {
	for (const id of ids) {
		const data = await getPost(id);
		console.log(data);
	}
	console.log("I'm waiting on you");
};

/**
 * Promise.all is faster if sequence is not mandatory, but if one
 * Promise fails all fill be rejected
 */
const getPostConcurrently = async (ids) => {
	const post = await Promise.all(ids.map((id) => getPost(id)));
	console.log(post);
	console.log("I'm waiting on you");
};

const getPostConcurrentlyPromiseSettled = async (ids) => {
	const post = await Promise.allSettled(ids.map((id) => getPost(id)));
	console.log(post);
	console.log("I'm waiting on you");
};

const getPostSerializedReduce = async (ids) => {
	await ids.reduce(async (acc, id) => {
		// waits for the previous item to complete
		await acc;
		// get next item
		const post = await getPost(id);
		console.log(post);
	}, Promise.resolve());
	console.log("I'm waiting on you");
};

const getPost = async (id) => {
	return await (
		await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
	).json();
};
