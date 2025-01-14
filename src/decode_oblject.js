
export function decode(codedObject) {
	const decodedObject = JSON.parse(atob(codedObject));
	return decodedObject;
}

export function incode(myObject) {

	// JSON string
	const jsonString = JSON.stringify(myObject);

	// Encode to Base64
	const codedObject = btoa(jsonString);

	return codedObject;
}
