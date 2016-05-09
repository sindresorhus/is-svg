import fs from 'fs';
import test from 'ava';
import m from './';

test('valid SVGs', t => {
	t.true(m(fs.readFileSync('fixtures/fixture.svg')));
	t.true(m('<svg width="100" height="100" viewBox="0 0 30 30" version="1.1"></svg>'));
	t.true(m('<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg></svg>'));
	t.true(m('<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg></svg>'));
	t.true(m('<svg></svg>    '));
	t.true(m('    <svg></svg>'));
	t.true(m('<svg>\n</svg>'));
	t.true(m('<!--unicorn--><svg>\n</svg><!--cake-->'));
});

test('invalid SVGs', t => {
	t.false(m(fs.readFileSync('fixtures/fixture.jpg')));
	t.false(m('this is not svg, but it mentions <svg> tags'));
	t.false(m('<svg> hello I am an svg oops maybe not'));
	t.false(m('<svg></svg> this string starts with an svg'));
	t.false(m('this string ends with an svg <svg></svg>'));
	t.false(m('<div><svg></svg>'));
	t.false(m('<div><svg></svg></div>'));
	t.false(m('this string contains an svg <svg></svg> in the middle'));
	t.false(m(fs.readFileSync('readme.md')));
	t.false(m(fs.readFileSync('index.js')));
});
