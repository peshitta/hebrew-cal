/** @module hebrewCal */
import { Writing, Mapper } from 'aramaic-mapper';
import {
  allConsonants as hebrewConsonants,
  allVowels as hebrewVowels,
  allDiacritics as hebrewDiacritics,
  cantillationDiacritics as hebrewCantillationDiacritics,
  isBegadkepat,
  isDotted
} from 'hebrew-code-util';
import { consonants as calConsonants, diacriticsByName } from 'cal-code-util';

/**
 * @private
 * Hebrew destination writing
 * @const
 * @type { Writing }
 */
const hebrewWriting = new Writing(
  Object.freeze(
    hebrewConsonants.concat([
      '\u2135', // ℵ alef symbol
      '\u2136', // ℶ bet symbol
      '\u2137', // ℷ gimel symbol
      '\u2138' // ℸ dalet symbol
    ])
  ),
  hebrewVowels,
  hebrewDiacritics
);

const cantillations = [];
for (let i = 0, len = hebrewCantillationDiacritics.length; i < len; i++) {
  cantillations.push('');
}

/**
 * @private
 * CAL source writing
 * @const
 * @type { Writing }
 */
const calWriting = new Writing(
  Object.freeze(
    calConsonants.concat(
      [
        'k', // ך HEBREW LETTER FINAL KAF
        'm', // ם HEBREW LETTER FINAL MEM
        'n', // ן HEBREW LETTER FINAL NUN
        'p', // ף HEBREW LETTER FINAL PE
        'c' // ץ HEBREW LETTER FINAL TSADI
      ]
        .concat([
          'ww', // װ HEBREW LIGATURE YIDDISH DOUBLE VAV = tsvey vovn
          'wy', // ױ HEBREW LIGATURE YIDDISH VAV YOD
          'yy' // ײ HEBREW LIGATURE YIDDISH DOUBLE YOD = tsvey yudn
        ])
        .concat([
          ')', // ℵ alef symbol
          'b', // ℶ bet symbol
          'g', // ℷ gimel symbol
          'd' // ℸ dalet symbol
        ])
    )
  ),
  Object.freeze([
    'a', //  ַ HEBREW POINT PATAH
    'o', //  ָ HEBREW POINT QAMATS
    'e', //  ֵ HEBREW POINT TSERE
    'i', //  ִ HEBREW POINT HIRIQ
    '' //  ּ HEBREW POINT DAGESH OR MAPIQ: callback will distinguish
  ])
    .concat([
      'E', //  ֶ HEBREW POINT SEGOL
      'O' //  ֺHEBREW POINT HOLAM HASER FOR VAV
    ])
    .concat([
      'O', //  ֹ HEBREW POINT HOLAM
      'u', //  ֻ HEBREW POINT QUBUTS
      '', //  ְ HEBREW POINT SHEVA
      'E', //  ֱ HEBREW POINT HATAF SEGOL
      'a', //  ֲ HEBREW POINT HATAF PATAH
      'O', //  ֳ HEBREW POINT HATAF QAMATS
      'O' //  ׇ HEBREW POINT QAMATS QATAN → \u05B8 hebrew point qamats
    ]),
  Object.freeze(
    [
      '', //  ֽ HEBREW POINT METEG
      diacriticsByName.rukkakha, //  ֿ HEBREW POINT RAFE
      '', //  ׁHEBREW POINT SHIN DOT: callback will handle
      '', //  ׂHEBREW POINT SIN DOT: callback will handle
      '', //  ׄ HEBREW MARK UPPER DOT
      '' //  ׅ HEBREW MARK LOWER DOT
    ].concat(cantillations)
  )
);

const dagesh = '\u05BC'; //  ּ HEBREW POINT DAGESH OR MAPIQ = shuruq
const rafe = '\u05BF'; //  ֿ HEBREW POINT RAFE
const shin = '\u05E9'; // ש HEBREW LETTER SHIN
const sinDot = '\u05C2'; //  ׂHEBREW POINT SIN DOT
const vav = '\u05D5'; // ו HEBREW LETTER VAV
const mapChar = (c, fromTo) => {
  const m = fromTo[c];
  return m || m === '' ? m : c;
};

/**
 * @private
 * Customized mapping callback
 * @param { string } word input word
 * @param { number } i current index in the word
 * @param { Object.<string, string> } fromTo mapping dictionary
 * @param { Object } wordProps optional word settings
 * @returns { string } Call mapped char
 */
const callback = (word, i, fromTo, wordProps) => {
  const c = word.charAt(i);
  const n = word.charAt(i + 1);
  if (wordProps.isDotted && isBegadkepat(c)) {
    const b = mapChar(c, fromTo);
    //  ּ HEBREW POINT DAGESH OR MAPIQ
    if (n === dagesh) {
      return b + diacriticsByName.qushaya; // not handling begadkepat dagesh forte
    }
    if (n === rafe || i === word.length - 1) {
      return b;
    }
    return b + diacriticsByName.rukkakha;
  }
  switch (c) {
    case dagesh: //  ּ HEBREW POINT DAGESH OR MAPIQ and ו HEBREW LETTER VAV
      return word.charAt(i - 1) === vav ? 'u' : '';
    case shin: // ש HEBREW LETTER SHIN and ׂHEBREW POINT SIN DOT
      return n === sinDot ? '&' : '$';
    default:
      return mapChar(c, fromTo);
  }
};

/**
 * Hebrew Mapper
 * @const
 * @type { Mapper }
 */
export const mapper = new Mapper(hebrewWriting, calWriting, callback);
mapper.multiples = Object.freeze(['b,', 'g,', 'd,', 'k,', 'p,', 't,']);

/**
 * Convert from Hebrew Unicode to CAL
 * @static
 * @param { string } word input word in Hebrew Unicode
 * @returns { string } the input word converted to CAL code
 */
export const toCal = word =>
  mapper.map(
    word,
    Object.freeze(
      Object.create(null, {
        isDotted: { value: isDotted(word), enumerable: true }
      })
    )
  );
