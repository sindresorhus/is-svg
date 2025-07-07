import {XmlTextDetector} from '@file-type/xml';

export default function isSvg(string, {validate} = {}) {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
	}

	string = string.trim();

	if (string.length === 0) {
		return false;
	}

	const fullScan = validate !== false;

	const xmlTextDetector = new XmlTextDetector({fullScan});

	let offset = 0;

	if (fullScan) {
		xmlTextDetector.write(string);
		if (!xmlTextDetector.isValid()) {
			return false;
		}
	} else {
		const chunkSize = 128;
		while (string.length > offset && !xmlTextDetector.onEnd) {
			xmlTextDetector.write(string.slice(offset, Math.min(offset + chunkSize, string.length)));
			offset += chunkSize;
		}
	}

	return xmlTextDetector.fileType?.ext === 'svg';
}
