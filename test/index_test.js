const test = require('assert');
const sut = require('../build/hebrew-cal');

describe('Hebrew', () => {
  describe('To CAL', () => {
    it('General case usage, with one-to-one mapping', () => {
      const word = sut.toCal('דקסריא-דפיליפוס');
      const wordExpected = 'dqsry)-dpylypws';
      const vocalised = sut.toCal('דּקֵסַרִיַא-דפיִליִפּוֺס');
      const vocalisedExpected = "d'qesariya)-d,p,yilyip'wOs";
      test.strictEqual(word, wordExpected, 'sut.toCal_generic consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toCal_generic vocalised'
      );
    });
    it('Word with (yi) => (i;) mapping', () => {
      const word = sut.toCal('דילידותה');
      const wordExpected = 'dylydwth';
      const vocalised = sut.toCal('דּיִליִדוּתֵהֶ');
      const vocalisedExpected = "d'yilyid,wut,ehE";
      test.strictEqual(word, wordExpected, 'sut.toCal_yi consonant');
      test.strictEqual(vocalised, vocalisedExpected, 'sut.toCal_yi vocalised');
    });
    it('Word with short Eastern (E) => (e) mapping', () => {
      const word = sut.toCal('אולד');
      const wordExpected = ')wld';
      const vocalised = sut.toCal('אַולֶד');
      const vocalisedExpected = ')awlEd';
      test.strictEqual(word, wordExpected, 'sut.toCal_yi consonant');
      test.strictEqual(vocalised, vocalisedExpected, 'sut.toCal_yi vocalised');
    });
    it('Word with (wu) => (uO) mapping', () => {
      const word = sut.toCal('לבעלדבביכון');
      const wordExpected = 'lb(ldbbykwn';
      const vocalised = sut.toCal('לַבעֵלדּבָבַיכּוּן');
      const vocalisedExpected = "lab,(eld'b,ob,ayk'wun";
      test.strictEqual(word, wordExpected, 'sut.toCal_wu consonant');
      test.strictEqual(vocalised, vocalisedExpected, 'sut.toCal_wu vocalised');
    });
    it('Word with (wO) => (oO) mapping', () => {
      const word = sut.toCal('אבהוהי');
      const vocalised = sut.toCal('אַבָהַוהי');
      const wordExpected = ')bhwhy';
      const vocalisedExpected = ')ab,ohawhy';
      test.strictEqual(word, wordExpected, 'sut.toCal_wO consonant');
      test.strictEqual(vocalised, vocalisedExpected, 'sut.toCal_wO vocalised');
    });
    it('Word with Hebrew Sin', () => {
      const word = sut.toCal('אפבהוהש');
      const wordExpected = ')pbhwh$';
      const vocalised = sut.toCal('אַפֵבָהַוהשָׂ');
      const vocalisedExpected = ')ap,eb,ohawh&o';
      test.strictEqual(word, wordExpected, 'sut.toCal consonant with Sin');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toCal vocalised with Sin'
      );
    });
    it('Word with Hebrew Shin', () => {
      const word = sut.toCal('אדשא');
      const wordExpected = ')d$)';
      const vocalised = sut.toCal('אָדשָׁא');
      const vocalisedExpected = ')od,$o)';
      test.strictEqual(word, wordExpected, 'sut.toCal consonant with Shin');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toCal vocalised with Shin'
      );
    });
    it('Invalid Rukkakha', () => {
      const word = sut.toCal('אפבהסוהשׂ');
      const wordExpected = ')p,b,hswh&';
      test.strictEqual(word, wordExpected, 'sut.toCal invalid rukkakha');
    });
    it('Dagesh Forte', () => {
      const word = sut.toCal('אפבהסּוהשׂ');
      const wordExpected = ')p,b,hswh&';
      test.strictEqual(word, wordExpected, 'sut.toCal invalid rukkakha');
    });
    it('Standalone Ou', () => {
      const word = sut.toCal('אפבֹהסֻוהשׂ');
      const wordExpected = ')p,b,Ohsuwh&';
      test.strictEqual(word, wordExpected, 'sut.toCal invalid rukkakha');
    });
    it('Blank word returns blank', () => {
      const word = sut.toCal('');
      const wordExpected = '';
      test.strictEqual(word, wordExpected, 'sut.toCal_blank');
    });
    it('Null word returns null', () => {
      const word = sut.toCal(null);
      const wordExpected = null;
      test.strictEqual(word, wordExpected, 'sut.toCal_null');
    });
    it('Undefined word returns undefined', () => {
      const word = sut.toCal(undefined);
      const wordExpected = undefined;
      test.strictEqual(word, wordExpected, 'sut.toCal_undefined');
    });
    it('0 number as word returns 0', () => {
      const word = sut.toCal(0);
      const wordExpected = 0;
      test.strictEqual(word, wordExpected, 'sut.toCal_zero');
    });
  });
  describe('Mapped writing', () => {
    it('Consonants length', () => {
      test.strictEqual(
        sut.mapper.fromWriting.consonants.length,
        sut.mapper.toWriting.consonants.length,
        'Length differs'
      );
      test.ok(
        sut.mapper.fromWriting.consonants.length > 22,
        'Length greater than 22'
      );
    });
    it('Vowels length', () => {
      test.strictEqual(
        sut.mapper.fromWriting.vowels.length,
        sut.mapper.toWriting.vowels.length,
        'Length differs'
      );
      test.ok(
        sut.mapper.fromWriting.vowels.length > 5,
        'Length greater than 5'
      );
    });
  });
});

describe('Hebrew', () => {
  describe('To CAL', () => {
    it('Blank word returns blank', () => {
      const word = sut.toCal('');
      const wordExpected = '';
      test.strictEqual(word, wordExpected, 'sut.toCal_blank');
    });
    it('Null word returns null', () => {
      const word = sut.toCal(null);
      const wordExpected = null;
      test.strictEqual(word, wordExpected, 'sut.toCal_null');
    });
    it('Undefined word returns undefined', () => {
      const word = sut.toCal(undefined);
      const wordExpected = undefined;
      test.strictEqual(word, wordExpected, 'sut.toCal_undefined');
    });
    it('0 number as word returns 0', () => {
      const word = sut.toCal(0);
      const wordExpected = 0;
      test.strictEqual(word, wordExpected, 'sut.toCal_zero');
    });
  });
  describe('Mapped writing', () => {
    it('Consonants length', () => {
      test.strictEqual(
        sut.mapper.fromWriting.consonants.length,
        sut.mapper.toWriting.consonants.length,
        'Length differs'
      );
      test.ok(
        sut.mapper.fromWriting.consonants.length > 22,
        'Length greater than 22'
      );
    });
    it('Vowels length', () => {
      test.strictEqual(
        sut.mapper.fromWriting.vowels.length,
        sut.mapper.toWriting.vowels.length,
        'Length differs'
      );
      test.ok(
        sut.mapper.fromWriting.vowels.length > 5,
        'Length greater than 5'
      );
    });
  });
});
