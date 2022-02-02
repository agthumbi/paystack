
const request = require('supertest')
const main = require('./main')

let session = 0


describe('General starting point', () => {
    test('Test Landing page', async () => {
        const response = await request(main).get('/')
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('Welcome to PayStack api')


    })
    test('Test API status', async () => {
        const response = await request(main).get('/status')
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('0')


    })
})
describe('Product Listing', () => {

    test('Category Listing=>Show Category listing', async () => {
        const logic = require('./config/logic')
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature


        const response = await request(main).get('/catgories/fetch')
            .set(headers)
        expect(response.statusCode).toBe(200)
        expect.arrayContaining(Array)


    })

    test('Test API status=>Show Authentication Error', async () => {
        const response = await request(main).get('/catgories/fetch')
        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])


    })

    test('Product Listing by category id=>Show Product listing', async () => {
        const logic = require('./config/logic')
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature


        const response = await request(main).get('/products/categoryid/fetch/1')
            .set(headers)
        expect(response.statusCode).toBe(200)
        expect.arrayContaining(Array)


    })

    test('Product Listing by category id=>Show Authentication Error', async () => {
        const response = await request(main).get('/products/categoryid/fetch/1')
        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])


    })

    test('Product Listing with random characters =>Should fail', async () => {
        const logic = require('./config/logic')
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature


        const response = await request(main).get('/products/categoryid/fetch/&*1')
            .set(headers)

        expect(response.statusCode).toBe(403)


    })

    test('Product Listing with random characters=>Show Authentication Error', async () => {
        const response = await request(main).get('/products/categoryid/fetch/%#')
        expect(response.statusCode).toBe(403)
    })
})
//phase 1
describe('Cart', () => {

    test('Add to Cart with auth=>Should add product 1', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSession();
        session = `${1000 + Number(session)}`
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature

        const response = await request(main).post('/cart/session/add')
            .set(headers)

            .send({
                "productid": 1,
                "isGuest": true,
                "session_id": session,
                "qty": 4
            })
        expect.arrayContaining(Array)

    })
    test('Add to Cart with auth=>Should add product 2 in the same session', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature

        const response = await request(main).post('/cart/session/add')
            .set(headers)
            .send({
                "productid": 2,
                "isGuest": true,
                "session_id": session,
                "qty": 4
            })

        expect.arrayContaining(Array)
    })
    test('Add to Cart without auth=>Should Fail to product 1', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const response = await request(main).post('/cart/session/add')

            .send({
                "productid": 1,
                "isGuest": true,
                "session_id": session,
                "qty": 4
            })

        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])

    })


    test('Update Cart with auth=>Should update cart to product 1', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature

        const response = await request(main).put('/cart/session/update')
            .set(headers)

            .send({
                "productid": 1,
                "isGuest": false,
                "session_id": session,
                "qty": 2
            })
        expect.arrayContaining(Array)

    })
    test('Update Cart with auth=>Should update cart to product 2 in the same session', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature

        const response = await request(main).put('/cart/session/update')
            .set(headers)
            .send({
                "productid": 2,
                "isGuest": false,
                "session_id": session,
                "qty": 1
            })

        expect.arrayContaining(Array)
    })
    test('Update without auth=>Should Fail to update cart to product 1', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`

        const response = await request(main).put('/cart/session/update')

            .send({
                "productid": 1,
                "isGuest": true,
                "session_id": session,
                "qty": 4
            })

        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])
    })

    test('View Cart with  auth=>Show Cart items', async () => {
        const logic = require('./config/logic')
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature
        session = await logic.GetSameSession();

        session = `${1000 + Number(session)}`

        const response = await request(main).get(`/cart/session/fetch/${session}`)
            .set(headers)
        expect(response.statusCode).toBe(200)
        expect.arrayContaining(Array)


    })

    test('View Cart with no auth=>Should fail to authenticate', async () => {
        const logic = require('./config/logic')

        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const response = await request(main).get(`/cart/session/fetch/${session}`)
        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])



    })

    test('Remove one item in Cart with  auth=>Delete item(product 1) in a Cart items', async () => {
        const logic = require('./config/logic')
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature
        session = await logic.GetSameSession();

        session = `${1000 + Number(session)}`

        const response = await request(main).put(`/cart/session/remove/item/${session}/1`)
            .set(headers)

        expect(response.statusCode).toBe(200)
        expect.arrayContaining(Array)

    })

    test('Remove one item in Cart no auth=>Should fail to authenticate', async () => {
        const logic = require('./config/logic')

        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const response = await request(main).put(`/cart/session/remove/item/${session}/1`)
        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])



    })
    test('Remove whole Cart with auth=>Delete everything in cart items', async () => {
        const logic = require('./config/logic')
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature
        session = await logic.GetSameSession();

        session = `${1000 + Number(session)}`

        const response = await request(main).put(`/cart/session/remove/${session}`)
            .set(headers)

        expect(response.statusCode).toBe(200)
        expect.arrayContaining(Array)


    })

    test('Remove whole Cart with no auth=>Should fail to authenticate', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const response = await request(main).put(`/cart/session/remove/${session}`)
        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])



    })
    test('Checkout Cart with auth=>Should checkout the cart items', async () => {
        const logic = require('./config/logic')
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature
        session = await logic.GetSameSession();

        session = `${1000 + Number(session)}`

        const response = await request(main).put(`/cart/session/checkout/${session}`)
            .set(headers)

        expect(response.statusCode).toBe(404)



    })

    test('Checkout Cart with no auth=>Should fail to authenticate', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const response = await request(main).put(`/cart/session/checkout/${session}`)
        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])



    })

})


//phase 2
describe('Cart', () => {

    test('Add to Cart with auth=>Should add product 1', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSession();
        session = `${1000 + Number(session)}`
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature

        const response = await request(main).post('/cart/session/add')
            .set(headers)

            .send({
                "productid": 1,
                "isGuest": true,
                "session_id": session,
                "qty": 4
            })
        expect.arrayContaining(Array)

    })
    test('Add to Cart with auth=>Should add product 2 in the same session', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature

        const response = await request(main).post('/cart/session/add')
            .set(headers)
            .send({
                "productid": 2,
                "isGuest": true,
                "session_id": session,
                "qty": 4
            })

        expect.arrayContaining(Array)
    })
    test('Add to Cart without auth=>Should Fail to product 1', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const response = await request(main).post('/cart/session/add')

            .send({
                "productid": 1,
                "isGuest": true,
                "session_id": session,
                "qty": 4
            })

        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])

    })


    test('Update Cart with auth=>Should update cart to product 1', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature

        const response = await request(main).put('/cart/session/update')
            .set(headers)

            .send({
                "productid": 1,
                "isGuest": false,
                "session_id": session,
                "qty": 2
            })
        expect.arrayContaining(Array)

    })
    test('Update Cart with auth=>Should update cart to product 2 in the same session', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature

        const response = await request(main).put('/cart/session/update')
            .set(headers)
            .send({
                "productid": 2,
                "isGuest": false,
                "session_id": session,
                "qty": 1
            })

        expect.arrayContaining(Array)
    })
    test('Update without auth=>Should Fail to update cart to product 1', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`

        const response = await request(main).put('/cart/session/update')

            .send({
                "productid": 1,
                "isGuest": true,
                "session_id": session,
                "qty": 4
            })

        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])
    })

    test('View Cart with  auth=>Show Cart items', async () => {
        const logic = require('./config/logic')
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature
        session = await logic.GetSameSession();

        session = `${1000 + Number(session)}`

        const response = await request(main).get(`/cart/session/fetch/${session}`)
            .set(headers)
        expect(response.statusCode).toBe(200)
        expect.arrayContaining(Array)


    })

    test('View Cart with no auth=>Should fail to authenticate', async () => {
        const logic = require('./config/logic')

        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const response = await request(main).get(`/cart/session/fetch/${session}`)
        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])



    })


    test('Checkout Cart with auth=>Should checkout the cart items', async () => {
        const logic = require('./config/logic')
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature
        session = await logic.GetSameSession();

        session = `${1000 + Number(session)}`

        const response = await request(main).put(`/cart/session/checkout/${session}`)
            .set(headers)

        expect(response.statusCode).toBe(200)



    })

    test('Checkout Cart with no auth=>Should fail to authenticate', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const response = await request(main).put(`/cart/session/checkout/${session}`)
        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])



    })

    test('Remove one item in Checked Out Cart with  auth=>Should not delete the cart that is flagged checkout', async () => {
        const logic = require('./config/logic')
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature
        session = await logic.GetSameSession();

        session = `${1000 + Number(session)}`

        const response = await request(main).put(`/cart/session/remove/item/${session}/1`)
            .set(headers)
     
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual([
            {
                code: 'E0',
                message: 'Cannot remove an item in a cart that is already paid'
            }
        ])


    })

    test('Remove one item in Cart no auth=>Should fail to authenticate', async () => {
        const logic = require('./config/logic')

        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const response = await request(main).put(`/cart/session/remove/item/${session}/1`)
        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])



    })
    test('Remove whole Checkout Cart with auth=>Should not delete the cart items of items that are flagged checkout', async () => {
        const logic = require('./config/logic')
        const headers = {}
        const timestamp = logic.timestamp()
        const nonce = logic.guid()
        const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
        const signature = logic.getSignature(cipher)
        headers.nonce = nonce
        headers.timestamp = timestamp
        headers.signature = signature
        session = await logic.GetSameSession();

        session = `${1000 + Number(session)}`

        const response = await request(main).put(`/cart/session/remove/${session}`)
            .set(headers)
            expect(response.statusCode).toBe(400)
            expect(response.body).toEqual([
                {
                    code: 'E0',
                    message: 'Cannot remove cart that is already paid'
                }
            ])


    })

    test('Remove whole Cart with no auth=>Should fail to authenticate', async () => {
        const logic = require('./config/logic')
        session = await logic.GetSameSession();
        session = `${1000 + Number(session)}`
        const response = await request(main).put(`/cart/session/remove/${session}`)
        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual([{ code: "E0", message: "Authentication Failed.Invalid Nonce" }])



    })

})