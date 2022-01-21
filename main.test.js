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
    it('GET/ Product By Category', () => {
        return request(app).get('/products/categoryid/fetch/1').expect(200).then(response => {
            expect(response.body).toEqual(expect.any(Object)

            )
        })
    })
    it('GET/ Product By Category', () => {
        return request(app).get('/products/categoryid/fetch/:1').expect(404).then(response => {
            expect(response.body).toEqual(expect.arrayContaining([

                expect.objectContaining({
                    code: expect.any(String),
                    message: expect.any(String),

                })
            ]))
        })
    })



});
