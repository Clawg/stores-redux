const randomiseMe = (arr) => {
	const passedArray = arr;
	const randomArray = passedArray[Math.floor(Math.random() * passedArray.length)];
	return randomArray;
}

export default randomiseMe;