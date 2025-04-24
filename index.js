import {XmlTextDetector, isXml} from '@file-type/xml';

export default function isSvg(string) {
	if (typeof string === 'string') {
		string = string.trim();

		if (string.length === 0) {
			return false;
		}

		const xmlTextDetector = new XmlTextDetector();
		xmlTextDetector.write(string);
		return xmlTextDetector.isValid() && xmlTextDetector.fileType?.ext === 'svg';	}

	if (string instanceof Uint8Array) {
		const xmlDetection = isXml(string);
		if (xmlDetection) {
			const textDecoder = new TextDecoder(xmlDetection.encoding);
			return isSvg(textDecoder.decode(string));
		}
		return false;
	}

	throw new TypeError(`Expected a \`string\` or \`Uint8Array\`, got \`${typeof string}\``);
}
