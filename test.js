import fs from 'fs';
import test from 'ava';
import isSvg from '.';

test('valid SVGs', t => {
	t.true(isSvg(fs.readFileSync('fixtures/fixture.svg')));
	t.true(isSvg('<svg width="100" height="100" viewBox="0 0 30 30" version="1.1"></svg>'));
	t.true(isSvg('<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg></svg>'));
	t.true(isSvg('<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg></svg>'));
	t.true(isSvg('<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [<!ENTITY ns_flows "http://ns.adobe.com/Flows/1.0/">]><svg></svg>'));
	t.true(isSvg('<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [ <!ENTITY ns_flows "http://ns.adobe.com/Flows/1.0/"> <!ENTITY ns_custom "http://ns.adobe.com/GenericCustomNamespace/1.0/"> ]><svg></svg>'));
	t.true(isSvg('<svg></svg>    '));
	t.true(isSvg('    <svg></svg>'));
	t.true(isSvg('<svg>\n</svg>'));
	t.true(isSvg('<!--unicorn--><svg>\n</svg><!--cake-->'));
	t.true(isSvg(`
<!-- Generator: Some Graphic Design Software  -->
<svg version="1.1">
</svg>
`));
});

test('invalid SVGs', t => {
	t.false(isSvg(fs.readFileSync('fixtures/fixture.jpg')));
	t.false(isSvg('this is not svg, but it mentions <svg> tags'));
	t.false(isSvg('<svg> hello I am an svg oops maybe not'));
	t.false(isSvg('<svg></svg> this string starts with an svg'));
	t.false(isSvg('this string ends with an svg <svg></svg>'));
	t.false(isSvg('<div><svg></svg>'));
	t.false(isSvg('<div><svg></svg></div>'));
	t.false(isSvg('this string contains an svg <svg></svg> in the middle'));
	t.false(isSvg(fs.readFileSync('readme.md')));
	t.false(isSvg(fs.readFileSync('index.js')));
	t.false(isSvg());
});

test('supports non-english characters', t => {
	t.true(isSvg(`<svg xmlns="http://www.w3.org/2000/svg"
	     width="100%" height="100%" viewBox="0 0 400 400"
	     direction="rtl" xml:lang="fa">

	  <title direction="ltr" xml:lang="en">Right-to-left Text</title>
	  <desc direction="ltr" xml:lang="en">
	    A simple example for using the 'direction' property in documents
	    that predominantly use right-to-left languages.
	  </desc>

	  <text x="200" y="200" font-size="20">داستان SVG 1.1 SE طولا ني است.</text>

	</svg>`));
});
