'use strict';
const htmlCommentRegex = require('html-comment-regex');

const isBinary = buffer => {
	const isBuffer = Buffer.isBuffer(buffer);

	for (let i = 0; i < 24; i++) {
		const characterCode = isBuffer ? buffer[i] : buffer.charCodeAt(i);

		if (characterCode === 65533 || characterCode <= 8) {
			return true;
		}
	}

	return false;
};

const regex = /^\s*(?:<\?xml[^>]*>\s*)?(?:<!doctype svg[^>]*\s*(?:\[?(?:\s*<![^>]*>\s*)*\]?)*[^>]*>\s*)?(?:<svg[^>]*>[^]*<\/svg>|<svg[^/>]*\/\s*>)\s*$/i;

const isSvg = input => Boolean(input) && !isBinary(input) && regex.test(input.toString().replace(htmlCommentRegex, ''));

module.exports = isSvg;
// TODO: Remove this for the next major release
module.exports.default = isSvg;
