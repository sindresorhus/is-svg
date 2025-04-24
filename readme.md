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

or for binary data (`Uint8Array`):
```js
import fs from 'node:fs';
import isSvg from 'is-svg';

const binaryData = fs.readFileSync('some.svg');
isSvg(binaryData);
```
