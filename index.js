import {XmlTextDetector} from '@file-type/xml';

export default function isSvg(string, {validate = true} = {}) {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
	}

	string = string.trim();

	if (string.length === 0) {
		return false;
	}

	const xmlTextDetector = new XmlTextDetector({fullScan: validate});

	if (validate) {
		xmlTextDetector.write(string);

		if (!xmlTextDetector.isValid()) {
			return false;
		}
	} else {
		const chunkSize = 128;

		let offset = 0;
		while (string.length > offset && !xmlTextDetector.onEnd) {
			xmlTextDetector.write(string.slice(offset, Math.min(offset + chunkSize, string.length)));
			offset += chunkSize;
		}
	}

	return xmlTextDetector.fileType?.ext === 'svg';
}
