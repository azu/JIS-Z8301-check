// LICENSE : MIT
"use strict";
import { isKatakana } from "./japaneseUtils"
/**
 * Default Katakana limit length without hypen.
 */
const DEFAULT_KATAKANA_LIMIT_LENGTH = 3;
/**
 * Katakana end hyphen character.
 */
const HYPHEN = 'ー';
/**
 * Katakana middle dot character.
 */
const KATAKANA_MIDDLE_DOT = '・';

class KatakanaEndHyphenValidator {
    constructor() {
        this.errors = [];
    }

    isKatakanaEndHyphen(katakana) {
        return (DEFAULT_KATAKANA_LIMIT_LENGTH < katakana.length
        && katakana.charAt(katakana.length - 1) == HYPHEN);
    }

    validate(sentence) {
        var katakana = "";
        for (var i = 0; i < sentence.length; i++) {
            var c = sentence.charAt(i);
            if (isKatakana(c) && c !== KATAKANA_MIDDLE_DOT) {
                katakana += c;
            } else {
                if (this.isKatakanaEndHyphen(katakana)) {
                    this.addError(sentence, i - 1, katakana);
                }
                katakana = "";
            }
        }
        if (this.isKatakanaEndHyphen(katakana)) {
            this.addError(sentence, sentence.length - 1, katakana);
        }
    }

    addError(sentence, startAt, katakana) {
        var expectedWord = sentence.substring(startAt, startAt - katakana.length - 1);
        this.errors.push({
            "actual": katakana,
            "expect": expectedWord
        });
    }
}

export function check(sentence) {
    console.log(sentence);
    var validator = new KatakanaEndHyphenValidator();
    validator.validate(sentence);
    return validator.errors;
}