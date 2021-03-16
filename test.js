import fs from 'fs';
import test from 'ava';
import timeSpan from 'time-span';
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
	t.true(isSvg('<svg/>'));
	t.true(isSvg(`
<!-- Generator: Some Graphic Design Software  -->
<svg version="1.1">
</svg>
`));
});

test('invalid SVGs', t => {
	t.false(isSvg(fs.readFileSync('fixtures/fixture.jpg')));
	t.false(isSvg('<div><svg></svg>'));
	t.false(isSvg('<div><svg></svg></div>'));
	t.false(isSvg(fs.readFileSync('index.js')));
	t.false(isSvg());
	t.false(isSvg('this string contains an svg <svg></svg> in the middle'));
	t.false(isSvg('<svg><div></svg>'));
	t.false(isSvg('this string ends with an svg <svg></svg>'));
	t.false(isSvg('<svg> hello I am an svg oops maybe not'));
	t.false(isSvg('this is not svg, but it mentions <svg> tags'));
	t.false(isSvg(fs.readFileSync('readme.md')));

	// https://github.com/NaturalIntelligence/fast-xml-parser/issues/327
	// t.false(isSvg('<svg></svg> this string starts with an svg'));
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

test('support markup inside Entity tags', t => {
	t.true(isSvg('<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [ <!ENTITY Smile " <rect x=\'.5\' y=\'.5\' width=\'29\' height=\'39\' fill=\'black\' stroke=\'red\'/> <g transform=\'translate(0, 5)\'> <circle cx=\'15\' cy=\'15\' r=\'10\' fill=\'yellow\'/><circle cx=\'12\' cy=\'12\' r=\'1.5\' fill=\'black\'/><circle cx=\'17\' cy=\'12\' r=\'1.5\' fill=\'black\'/><path d=\'M 10 19 L 15 23 20 19\' stroke=\'black\' stroke-width=\'2\'/></g>"> ]><svg width="850px" height="700px" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(16,0,0,16,0,0)">&Smile;</g></svg>'));
	t.true(isSvg('<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [ <!ENTITY Smile " <rect x=\'.5\' y=\'.5\' width=\'29\' height=\'39\' fill=\'black\' stroke=\'red\'/> <g transform=\'translate(0, 5)\'> <circle cx=\'15\' cy=\'15\' r=\'10\' fill=\'yellow\'/><circle cx=\'12\' cy=\'12\' r=\'1.5\' fill=\'black\'/><circle cx=\'17\' cy=\'12\' r=\'1.5\' fill=\'black\'/><path d=\'M 10 19 L 15 23 20 19\' stroke=\'black\' stroke-width=\'2\'/></g>"> <!ENTITY ns_flows "http://ns.adobe.com/Flows/1.0/">]><svg width="850px" height="700px" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(16,0,0,16,0,0)">&Smile;</g></svg>'));
	t.true(isSvg(`
	<?xml version="1.0" encoding="utf-8"?>
		<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [
			<!ENTITY Orange "<g transform='translate(0, 5)'><circle cx='12' cy='12' r='1.5' fill='orange'/><path d='M 10 19 L 15 23 20 19' stroke='orange' stroke-width='2'/></g>">
			<!ENTITY Melon "<g transform='translate(10, 10)'><circle cx='12' cy='12' r='1.5' fill='yellow'/><path d='M 10 19 L 15 23 20 19' stroke='yellow' stroke-width='2'/></g>">
		]>
	<svg width="850px" height="700px" version="1.1"
		xmlns="http://www.w3.org/2000/svg">
		<g transform="matrix(16,0,0,16,0,0)">
 			&Melon;
		 </g>
		 <g transform="matrix(32,0,0,32,0,0)">
 			&Orange;
 		</g>
	</svg>`));
});

test('regex should not be quadratic', t => {
	const end = timeSpan();

	isSvg(`<!doctype svg ${' '.repeat(34560)}`);

	if (end.seconds() < 10) {
		t.pass();
	} else {
		t.fail();
	}
});
