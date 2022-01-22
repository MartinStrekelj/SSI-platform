import { generatePIN, LZW_encode, LZW_decode } from './utils';

describe('Generate PIN', () => {
  it('should work', () => {
    const pin = generatePIN();
    expect(pin).toHaveLength(6);
  });
});

describe('LZW', () => {
  it('should work', () => {
    const text = `{"protected":"eyJ0eXAiOiJhcHBsaWNhdGlvbi9kaWRjb21tLWVuY3J5cHRlZCtqc29uIiwiZW5jIjoiWEMyMFAifQ","iv":"A8KfUrlTvDwN_yob7NuzjICsKD_pylfF","ciphertext":"149SxOTLppN45eUZFwjj6aWxRdBjiOYyDCBRAlHaDhavRkf3pIbBq-sAjN-o-qX5JTfwUGb_-iyO0bu7-0nA8f_7Ew7vtPjpcGXZyZceYcjx0hl-6cNK-ciNncyorUYhbTUYQ9p2niuDAlmljtPLV5Bz58PabXvW","tag":"5ayv2iK7_wCyl8XTF0orPw","recipients":[{"encrypted_key":"lHmGoXMatwIIMeS508vQK2ozbISYiEkmnu9cHyLttuE","header":{"alg":"ECDH-ES+XC20PKW","iv":"ge47GUnyTO7QcfH-OBO9zbgLCTqh6zTU","tag":"CbcLc-UxZFm-nNiyGXZEPw","epk":{"kty":"OKP","crv":"X25519","x":"Leu4vconxna35A9eiyghtur7YHC0Diq6iXVkRoNjZGk"},"kid":"did:key:z6MkuspDZnszAFgfypBzgFVdiJNp63NPvsAbzgDTUwTU59tc#z6LSj8F9MFStaysUxbZ2JbMxVPsy36TemrZgCjHYoxBjwkdH"}}]}`;
    const lzw_encoded = LZW_encode(text);
    console.log(lzw_encoded);
    console.log(lzw_encoded.length, text.length);
    expect(lzw_encoded.length).toBeLessThan(text.length);
    const decoded = LZW_decode(lzw_encoded);
    expect(decoded).toBe(text);
  });
});
