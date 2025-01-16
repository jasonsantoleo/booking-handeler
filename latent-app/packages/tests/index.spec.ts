import axios from 'axios'
import { describe } from 'node:test'
import { expect, test } from 'vitest'

const Backend_URL='http:://localhost:8080'

const PHONE_NUMBER1=9042868626
const PHONE_NUMBER2=9994190439
const NAME1="Jason"

describe('sign up ',()=>{
  test('double signup is not possiible', async () => {
    const response1 = await axios.post(`${Backend_URL}/api/v1/signup`,{
      number:PHONE_NUMBER1
    })
    const response2= await axios.post(`${Backend_URL}/api/v1/signup/verify`,{
      name:NAME1,
      otp:'00000',
    })
    expect(response1.status).toBe(200)
    expect(response2.status).toBe(401)
    expect(response2.data).not.toBeNull()
    expect(async()=>{
      await axios.post(`${Backend_URL}/api/v1/signup`,{
        number:PHONE_NUMBER1
      })
    }).toThrowError()
  })
})