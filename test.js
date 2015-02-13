'use strict';
var assert = require('assert');
var fs = require('fs');
var isSvg = require('./');

it('should detect SVG from Buffer', function () {
	assert(isSvg(fs.readFileSync('fixture.svg')));
	assert(isSvg('<svg width="100" height="100" viewBox="0 0 30 30" version="1.1"></svg>'));
	assert(!isSvg(fs.readFileSync('fixture.jpg')));
});
