# is-svg

> Check if a string is [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics)

## Install

```sh
npm install is-svg
```

## Usage

```js
import isSvg from 'is-svg';

isSvg('<svg xmlns="http://www.w3.org/2000/svg"><path fill="#00CD9F"/></svg>');
//=> true
```

When XML correctness is not critical for your application,
consider disabling XML validation to significantly improve performance,
with speed gains ranging from 12× to 60×, using the `validate` option:

```js
import isSvg from 'is-svg';

isSvg('<svg xmlns="http://www.w3.org/2000/svg"><path fill="#00CD9F"/></svg>', {validate: false});
//=> true
```
