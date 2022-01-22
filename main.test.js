const request = require('supertest')
const app = require('./main')
app.run()
describe('Checking status', () => {
    it('GET/ Welcome page', () => {
        return request(app).get('/').expect(200).then(response => {
            expect(response.body = 'Welcome to PayStack api')
        })
    })
    it('GET/status', () => {
        return request(app).get('/status').expect(200).then(response => {
            expect(response.body = 0)
        })
    })


});
describe('Category listing', () => {
    it('GET/ Categories', () => {
        return request(app).get('/catgories/fetch').expect(200).then(response => {
            expect(response.body).toEqual(expect.arrayContaining([

                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String)
                })
            ]))
        })
    })



});
describe('Product listing', () => {
    it('GET/ Product By Category--> return data', () => {
        return request(app).get('/products/categoryid/fetch/1').expect(200).then(response => {
            expect(response.body).toEqual(expect.any(Object)

            )
        })
    })
    it('GET/ Product By Category-->get 404 status', () => {
        return request(app).get('/products/categoryid/fetch/0').expect(404).then(response => {
            expect(response.body).toEqual(expect.arrayContaining([

                expect.objectContaining({
                    code: expect.any(String),
                    message: expect.any(String)
                })
            ]))
        })
    })

    it('GET/ Product By Product ID-->get 200 status', () => {
        return request(app).get('/products/productid/fetch/1').expect(200).then(response => {
            expect(response.body).toEqual(expect.any(Object))
        })
    })
    it('GET/ Product By Product ID-->get 404 status', () => {
        return request(app).get('/products/productid/fetch/-1').expect(404).then(response => {
            expect(response.body).toEqual(expect.any(Object))
        })
    })
});
describe('Cart function', () => {
    it('POST/ Add Cart-->get 200 status', () => {
        return request(app).post('/cart/session/add')
            .send({
                "productid": 1,
                "isGuest": true,
                "session_id": "1235",
                "p_qty": 1


            })
            .set('Accept', 'application/json')
            .expect(200).then(response => {
                expect(response.body).toEqual(expect.any(Object))
            })
    })
    it('POST/ Add Cart-->get 200 status', () => {
        return request(app).post('/cart/session/add')
            .send({
                "productid": 2,
                "isGuest": true,
                "session_id": "1235",
                "p_qty": 1


            })
            .set('Accept', 'application/json')
            .expect(200).then(response => {
                expect(response.body).toEqual(expect.any(Object))
            })
    })
    it('POST/ Add Cart-->get 400 status', () => {
        return request(app).post('/cart/session/add')
            .send({
                "productid": 2,
                "isGuest": true,
                "session_id": "1235",
                "p_qty": 1


            })
            .set('Accept', 'application/json')
            .expect(400).then(response => {
                expect(response.body)
                    .toEqual(expect.any(Object))
            })
    })
    it('PUT/ Edit Cart-->get 200 status', () => {
        return request(app).put('/cart/session/update')
            .send({
                "productid": 1,
                "isGuest": false,
                "session_id": "1235",
                "qty": 9


            })
            .set('Accept', 'application/json')
            .expect(200).then(response => {
                expect(response.body).toEqual(expect.any(Object))
            })
    })
    it('PUT/ Edit Cart-->get 400 status', () => {
        return request(app).put('/cart/session/update')
            .send({
                "productid": 0,
                "isGuest": true,
                "session_id": "1235",
                "qty": 9


            })
            .set('Accept', 'application/json')
            .expect(400).then(response => {
                expect(response.body)
                    .toEqual(expect.any(Object))
            })
    })
    it('GET/ View Cart-->get 200 status', () => {
        return request(app).get('/cart/session/fetch/1235')

            .expect(200).then(response => {
                expect(response.body).toEqual(expect.any(Object))
            })
    })
    it('GET/ View Cart-->get 404 status', () => {
        return request(app).get('/cart/session/fetch/1238')
            .expect(404).then(response => {
                expect(response.body).toEqual(expect.arrayContaining([

                    expect.objectContaining({
                        code: expect.any(String),
                        message: expect.any(String)
                    })
                ]))
            })
    })
    it('PUT/ Delete Cart-->get 200 status', () => {
        return request(app).put('/cart/session/remove/1235')

            .expect(200).then(response => {
                expect(response.body).toEqual(expect.any(Object))
            })
    })
    it('PUT/ Delete Cart-->get 404 status', () => {
        return request(app).put('/cart/session/remove/1235')
            .expect(404).then(response => {
            expect(response.body).toEqual(expect.arrayContaining([

                expect.objectContaining({
                    code: expect.any(String),
                    message: expect.any(String)
                })
            ]))
            })
    })

    




});
