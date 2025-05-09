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

If XML correctness isn't important for your use case, you can disable validation for a performance boost (about 12× to 60× times faster):

```js
import isSvg from 'is-svg';

isSvg('<svg xmlns="http://www.w3.org/2000/svg"><path fill="#00CD9F"/></svg>', {xmlValidation: false});
//=> true
```
