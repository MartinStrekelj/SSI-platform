import * as request from 'supertest'
import app from '../../main'

const VALID_DEV_DID = 'did:key:z6MkuspDZnszAFgfypBzgFVdiJNp63NPvsAbzgDTUwTU59tc'
const VALID_AUTHORITY_DID = 'did:ethr:rinkeby:0x036bf71fa0ce82df0262d076d17835e196ac0c86eb246ed955940d367ba2ae68dc'

describe('POST /login ~ Connect with wallet (holder)', () => {
  it('Returns 400 if not correct req.body', async () => {
    const response = await request(app).post('/api/login').send({
      hello: 'world',
    })
    expect(response.status).toBe(400)
  })

  it('Returns success if correct req.body ', async () => {
    const response = await request(app).post('/api/login').send({
      did: VALID_DEV_DID,
    })
    expect(response.status).toBe(200)
  })

  it('Returns a qr code', async () => {
    const response = await request(app).post('/api/login').send({
      did: VALID_DEV_DID,
    })
    expect(response.body.qrcode).toBeDefined()
  })

  it('Returns a BASE64 qr code', async () => {
    const response = await request(app).post('/api/login').send({
      did: VALID_DEV_DID,
    })
    const qrcode = response.body.qrcode as string
    expect(qrcode.startsWith('data:image/png;base64')).toBeTruthy()
  })

  it('Returns error if body req.body not correct', async () => {
    const response = await request(app).post('/api/login/2fa').send({
      did: VALID_DEV_DID,
    })
    expect(response.status).toBe(400)
  })

  it('Test if cache is set after login', async () => {
    await request(app).post('/api/login').send({
      did: VALID_DEV_DID,
    })

    const response = await request(app)
      .post('/api/login/2fa')
      .send({
        did: VALID_DEV_DID + '1',
        PIN: '123456',
      })

    const { message: message1 } = response.body
    expect(message1).toBe('No cache hit!')
    const response2 = await request(app).post('/api/login/2fa').send({
      did: VALID_DEV_DID,
      PIN: '123456',
    })

    const { message: message2 } = response2.body
    expect(message2).toBe('Not correct PIN')
  })
})

describe('POST /login ~ access granted (Authority)', () => {
  it('Returns error if body req.body not correct', async () => {
    const response = await request(app).post('/api/login/2fa').send({
      did: VALID_DEV_DID,
    })
    expect(response.status).toBe(400)
  })

  it('Should recognize holder DID', async () => {
    const response = await request(app).post('/api/login').send({
      did: VALID_DEV_DID,
    })

    expect(response.status).toBe(200)
    expect('accessGranted' in response.body).toBeFalsy()
  })

  it('Should recognize authority DID', async () => {
    const response = await request(app).post('/api/login').send({
      did: VALID_AUTHORITY_DID,
    })

    expect(response.status).toBe(200)
    expect('accessGranted' in response.body).toBeTruthy()
    expect('qrcode' in response.body).toBeTruthy()
    expect(response.body.qrcode).toBe('no qr code needed')
  })
})
