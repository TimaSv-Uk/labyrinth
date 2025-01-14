import { GameGrid } from "./GameGrid";

export function decode(codedObject) {
	const decodedObject = JSON.parse(atob(codedObject));

	let decoded_game_grid = new GameGrid(3,1,3);
	Object.assign(decoded_game_grid,decodedObject);
	return decoded_game_grid;
}

export function incode(myObject) {

	// JSON string
	const jsonString = JSON.stringify(myObject);

	// Encode to Base64
	const codedObject = btoa(jsonString);

	return codedObject;
}
