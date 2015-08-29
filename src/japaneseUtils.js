// LICENSE : MIT
"use strict";
require('String.prototype.codePointAt');
// http://www.unicode.org/charts/PDF/U30A0.pdf
export const KATA_START = 0x30a0;
export const KATA_END = 0x30ff;

export function isKatakana(char) {
    var codePoint = char.codePointAt(0);
    return (KATA_START <= codePoint && codePoint <= KATA_END)
}