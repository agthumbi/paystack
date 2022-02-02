
const { readStoredNonce,storeNonce } = require('./sequel')

test('Read Stored Nonce => Should check if it contains []',async()=>{
    const nonce=await readStoredNonce();
expect(nonce).toContain ('[')
expect(nonce).toContain (']')

})
