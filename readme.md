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

## API

### isSvg(string, options?)

#### options

Type: `object`

##### validate

Type: `boolean`\
Default: `true`

Whether to validate the SVG as proper XML.

Turning this off can improve performance significantly.
