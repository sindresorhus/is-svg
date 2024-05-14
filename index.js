import {XMLParser, XMLValidator} from 'fast-xml-parser';

export default function isSvg(string) {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
	}

	string = string.trim();

	if (string.length === 0) {
		return false;
	}

	// Has to be `!==` as it can also return an object with error info.
	if (XMLValidator.validate(string) !== true) {
		return false;
	}

	let jsonObject;
	const parser = new XMLParser();

	try {
		jsonObject = parser.parse(string);
	} catch {
		return false;
	}

	if (!jsonObject) {
		return false;
	}

	if (!Object.keys(jsonObject).some(x => x.toLowerCase() === 'svg')) {
		return false;
	}

	return true;
}
