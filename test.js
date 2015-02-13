'use strict';
var assert = require('assert');
var fs = require('fs');
var isSvg = require('./');

it('should detect SVG from Buffer', function () {
	assert(isSvg(fs.readFileSync('fixture.svg')));
	assert(isSvg('<svg width="100" height="100" viewBox="0 0 30 30" version="1.1"></svg>'));
	assert(!isSvg(fs.readFileSync('fixture.jpg')));
});

it('should permit xml declarations', function() {
  assert(isSvg('<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg></svg>'));
});

it('should not match svg tags in the middle of a document', function() {
  assert(!isSvg('this is not svg, but it mentions <svg> tags'));
});

it('should not match malformed input', function() {
  assert(!isSvg('<svg> hello I am an svg oops maybe not'));
});

it('should not think the readme is an SVG', function() {
  assert(!isSvg(fs.readFileSync('readme.md')));
});

it('should not think its own code is an SVG', function() {
  assert(!isSvg(fs.readFileSync('index.js')));
});
