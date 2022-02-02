const logic = require('./logic')
const seq = require('./sequel')

seq.storeNonce('[]')

test('Validate  Nonce =>Should be valid: dajgdagsdagshdjgas34242', async () => {
    const valid = await logic.ValidNonce('dajgdagsdagshdjgas34242');
    expect(valid).toBe(true)


})
test('Validate Same as above Nonce => Should be invalid :dajgdagsdagshdjgas34242', async () => {
    const valid = await logic.ValidNonce('dajgdagsdagshdjgas34242');
    expect(valid).toBe(false)

})
const timestamp = logic.timestamp()
test(`Validate TimeStamp => ${timestamp}`, async () => {
    const valid = logic.ValidateStamp(timestamp)
    expect(valid).toBe(true)


})
test(`Validate false TimeStamp => ${timestamp}`, async () => {
    const valid = logic.ValidateStamp(4314324233)
    expect(valid).toBe(false)


})
test(`Validate true signature=> Should return valid`, async () => {
    const headers = {}
    const nonce = logic.guid()
    const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
    const signature = logic.getSignature(cipher)
    headers.nonce = nonce
    headers.timestamp = timestamp
    headers.signature = signature

    const valid = logic.validateSignature(headers)
    expect(valid).toBe(true)
})
test(`Validate false signature=> Should return invalid`, async () => {
    const headers = {}
    headers.nonce = '130c7e7b8f3754f93b5f7ad3559ac946'
    headers.timestamp = 1643795688
    headers.signature = '/CcCmObuBJCG2KtfqU3DLmEthVRCrESGUs+XSu1dz8U='
    let valid = logic.ValidateStamp(headers.timestamp)
    if (valid)
        valid = logic.validateSignature(headers)
    expect(valid).toBe(false)
})
test(`Responses with error handling:logic.response(code)=> Should return json object with non existsing records`, async () => {
    const response = logic.response(1)
  
    expect(response).toEqual({ code: 'E2', message: 'No Record(s) Exists' })
})

test(`Responses with error handling:logic.response(code)=> Should return json object with system error`, async () => {
    const response = logic.response(0)
   
    expect(response).toEqual({ code: 'E1', message: 'Something wento wrong.Please try again..' })
})
test(`Responses with error handling:logic.response(code,message)=> Should return json object with custom error`, async () => {
    const response = logic.response(2, 'General Error')
    expect(response).toEqual({ code: 'E0', message: 'General Error' })
})

test(`Responses with error handling:logic.validateResponse(result)=> Should return system error`, async () => {
    const final = logic.validateResponse(undefined)
    expect(final).toEqual([{ code: 'E1', message: 'Something wento wrong.Please try again..' }])

})
test(`Responses with error handling:logic.validateResponse(result)=> Should return json object of non existing record(s)`, async () => {
    const final = logic.validateResponse([])
    expect(final).toEqual([{ code: 'E2', message: 'No Record(s) Exists' }])

})

test(`Responses with error handling:logic.validateResponse(result)=> Should return json object of  existing product record(s)`, async () => {
    const final = logic.validateResponse([{ productid: 1, sku: 'JT-01-01',name:'Jeans' }])
    expect(final).toEqual([{ productid: 1, sku: 'JT-01-01',name:'Jeans' }])

})

test(`Responses with error handling:logic.validateResponse(result)=> Should return json object after adding a cart`, async () => {
    const final = logic.validateResponse([{ code: 0, message:'Added cart successfully' }])
    expect(final).toEqual([{ code: 0, message:'Added cart successfully' }])

})