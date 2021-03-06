import { generatePIN, LZW_encode, LZW_decode } from './utils'
import { formatDate } from './date-utils'

describe('Generate PIN', () => {
  it('should work', () => {
    const pin1 = generatePIN()
    const pin2 = generatePIN()

    expect(pin1).toHaveLength(6)
    expect(pin2).toHaveLength(6)
    expect(pin1 === pin2).toBeFalsy()
  })
})

describe('LZW', () => {
  it('should work', () => {
    const text = `{"protected":"eyJ0eXAiOiJhcHBsaWNhdGlvbi9kaWRjb21tLWVuY3J5cHRlZCtqc29uIiwiZW5jIjoiWEMyMFAifQ","iv":"A8KfUrlTvDwN_yob7NuzjICsKD_pylfF","ciphertext":"149SxOTLppN45eUZFwjj6aWxRdBjiOYyDCBRAlHaDhavRkf3pIbBq-sAjN-o-qX5JTfwUGb_-iyO0bu7-0nA8f_7Ew7vtPjpcGXZyZceYcjx0hl-6cNK-ciNncyorUYhbTUYQ9p2niuDAlmljtPLV5Bz58PabXvW","tag":"5ayv2iK7_wCyl8XTF0orPw","recipients":[{"encrypted_key":"lHmGoXMatwIIMeS508vQK2ozbISYiEkmnu9cHyLttuE","header":{"alg":"ECDH-ES+XC20PKW","iv":"ge47GUnyTO7QcfH-OBO9zbgLCTqh6zTU","tag":"CbcLc-UxZFm-nNiyGXZEPw","epk":{"kty":"OKP","crv":"X25519","x":"Leu4vconxna35A9eiyghtur7YHC0Diq6iXVkRoNjZGk"},"kid":"did:key:z6MkuspDZnszAFgfypBzgFVdiJNp63NPvsAbzgDTUwTU59tc#z6LSj8F9MFStaysUxbZ2JbMxVPsy36TemrZgCjHYoxBjwkdH"}}]}`
    const lzw_encoded = LZW_encode(text)
    expect(lzw_encoded.length).toBeLessThan(text.length)
    const decoded = LZW_decode(lzw_encoded)
    expect(decoded).toBe(text)
  })
})

describe('test Date utils', () => {
  it('should format date', () => {
    const date = '2022-02-02T19:20:12.000Z'
    const formatted = formatDate(date)

    const udf = undefined
    const frm = formatDate(udf)

    expect(formatted).toBe('02.02.2022 at 20:20')
    expect(frm).toBe('N/A')
  })
})
