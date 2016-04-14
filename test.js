'use strict';
var assert = require('assert');
var fs = require('fs');
var isSvg = require('./');

it('should detect SVG from Buffer', function () {
	assert(isSvg(fs.readFileSync('fixture.svg')));
	assert(isSvg('<svg width="100" height="100" viewBox="0 0 30 30" version="1.1"></svg>'));
	assert(isSvg('<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg></svg>'));
	assert(isSvg('<svg></svg>    '));
	assert(isSvg('    <svg></svg>'));
	assert(isSvg('<svg>\n</svg>'));
	assert(!isSvg(fs.readFileSync('fixture.jpg')));
	assert(!isSvg('this is not svg, but it mentions <svg> tags'));
	assert(!isSvg('<svg> hello I am an svg oops maybe not'));
	assert(!isSvg('<svg></svg> this string starts with an svg'));
	assert(!isSvg('this string ends with an svg <svg></svg>'));
	assert(!isSvg('<div><svg></svg>'));
	assert(!isSvg('<div><svg></svg></div>'));
	assert(!isSvg('this string contains an svg <svg></svg> in the middle'));
	assert(!isSvg(fs.readFileSync('readme.md')));
	assert(!isSvg(fs.readFileSync('index.js')));
});
