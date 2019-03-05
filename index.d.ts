/// <reference types="node"/>

/**
 * Check if a string or buffer is [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics).
 *
 * @param input - The data to check.
 * @returns Whether `input` is SVG or not.
 */
export default function isSvg(input: string | Buffer): boolean;
