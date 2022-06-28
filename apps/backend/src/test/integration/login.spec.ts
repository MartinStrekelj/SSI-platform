import * as request from 'supertest'
import app from '../../main'

const VALID_DEV_DID = 'did:key:z6MkuspDZnszAFgfypBzgFVdiJNp63NPvsAbzgDTUwTU59tc'

describe('POST /login ~ wallet connect', () => {
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
})

describe('POST /login + POST /login/2fa', () => {
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
