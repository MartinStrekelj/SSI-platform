type IGeneratePinUtilFunc = () => string;
type IProbabilyFunc = (p: number) => boolean;
type ITakeARandomCharFunc = (chars: string) => string;

const PIN_LENGTH = 6;
const NUMBERS = '0123456789';
const CHARS = 'ABCDEFGIJKLMNOPRSZTUVYZ'; // do not use čžš

/**
 * Generates pin
 */
export const generatePIN: IGeneratePinUtilFunc = () => {
  let pin: string[] = [];
  for (let index = 0; index < PIN_LENGTH; index++) {
    if (shouldHappenWithProbability(0.75)) {
      pin = [...pin, takeARandomChar(NUMBERS)];
    } else {
      pin = [...pin, takeARandomChar(CHARS)];
    }
  }
  return pin.join('');
};

const shouldHappenWithProbability: IProbabilyFunc = (p: number) =>
  Math.random() < p;

const takeARandomChar: ITakeARandomCharFunc = (chars: string) => {
  const indexAt: number = Math.floor(Math.random() * chars.length);
  return chars[indexAt];
};

/**
 * LZW alg
 */
export const LZW_encode = (s: string) => {
  let dict = {};
  let data = (s + '').split('');
  let out = [];
  let currChar;
  let phrase = data[0];
  let code = 256;
  for (var i = 1; i < data.length; i++) {
    currChar = data[i];
    // @ts-ignore
    if (dict[phrase + currChar] != null) {
      phrase += currChar;
    } else {
      // @ts-ignore
      out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
      // @ts-ignore
      dict[phrase + currChar] = code;
      code++;
      phrase = currChar;
    }
  }
  // @ts-ignore
  out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
  for (var i = 0; i < out.length; i++) {
    out[i] = String.fromCharCode(out[i]);
  }
  return out.join('');
};

export const LZW_decode = (s: string) => {
  let dict = {};
  let data = (s + '').split('');
  let currChar = data[0];
  let oldPhrase = currChar;
  let out = [currChar];
  let code = 256;
  let phrase;
  for (var i = 1; i < data.length; i++) {
    var currCode = data[i].charCodeAt(0);
    if (currCode < 256) {
      phrase = data[i];
    } else {
      // @ts-ignore
      phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
    }
    out.push(phrase);
    currChar = phrase.charAt(0);
    // @ts-ignore
    dict[code] = oldPhrase + currChar;
    code++;
    oldPhrase = phrase;
  }
  return out.join('');
};
