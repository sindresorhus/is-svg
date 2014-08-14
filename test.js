'use strict';
var assert = require('assert');
var fs = require('fs');
var isSvg = require('./');

it('should detect SVG from Buffer', function () {
	assert(isSvg(fs.readFileSync('fixture.svg')));
});
