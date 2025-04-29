import {XmlTextDetector} from '@file-type/xml';

export default function isSvg(string) {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
	}

	string = string.trim();

	if (string.length === 0) {
		return false;
	}

	const xmlTextDetector = new XmlTextDetector();
	xmlTextDetector.write(string);
	return xmlTextDetector.isValid() && xmlTextDetector.fileType?.ext === 'svg';
}
