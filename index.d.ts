export type Options = {
	/**
	Whether to validate the SVG as proper XML.

	Turning this off can improve performance significantly.

	@default true
	*/
	validate?: boolean;
};

/**
Check if a string is [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics).

@example
```
import isSvg from 'is-svg';

isSvg('<svg xmlns="http://www.w3.org/2000/svg"><path fill="#00CD9F"/></svg>');
//=> true
```
*/
export default function isSvg(string: string, options?: Options): boolean;
