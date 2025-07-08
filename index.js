import {XmlTextDetector} from '@file-type/xml';

export default function isSvg(string, {validate} = {}) {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
	}

	string = string.trim();

	if (string.length === 0) {
		return false;
	}

	const xmlTextDetector = new XmlTextDetector({fullScan: validate});

	let offset = 0;

	if (validate) {
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
