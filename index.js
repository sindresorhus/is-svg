import {XmlTextDetector} from '@file-type/xml';

export default function isSvg(string, {validate = true} = {}) {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
	}

	string = string.trim();

	if (string.length === 0) {
		return false;
	}

	// Fast pre-check: SVG must start with `<` and contain `<svg` or `<?xml`
	// This avoids expensive XmlTextDetector full-scan on large non-XML buffers (e.g., PNG/JPG)
	if (!string.startsWith('<')) {
		return false;
	}

	const head = string.slice(0, 512).toLowerCase();
	if (!head.includes('<svg') && !head.includes('<?xml') && !head.includes('<!doctype svg')) {
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
