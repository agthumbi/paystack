const logic = require('../config/logic')
const mysql = require('mysql2')
var api = {}

var response = {}

// Category Listing
api.getProductsCategory = async (req, res) => {

    const sqlq = require('../config/rawsql')
    const result = await sqlq.query('call psp_get_categories();')
    response = logic.validateResponse(result)

    res.send(response)
}

// Fetch Product Listing by Category ID
api.getProductsByCategoryID = async (req, res) => {

    let payload = `categoryid`.split(',');
    let notifications = '';
    let bind = "";

    let arrRequest = []
    for (let field of payload) {
        notifications += logic.validatePayload(req.params, field)

        //request = request.replace(field, pool.escape(req.params[field]))
        if (notifications === '') {
            if (bind != '')
                bind += ','
            bind += `?`
            if (typeof req.params[field] === 'string')
                arrRequest.push(req.params[field])

            if (typeof req.params[field] === 'number')
                arrRequest.push(Number(req.params[field]))

            if (typeof req.params[field] === 'boolean')
                arrRequest.push(Boolean(req.params[field]))
        }



    }
    if (notifications != '')
        return res.send([logic.response(2, notifications)])


    const sqlq = require('../config/rawsql')

   
    //const result = await sqlq.query(`call psp_get_products_by_categoryId(${request})`)
    const result = await sqlq.query(`call psp_get_products_by_categoryId(${bind})`, arrRequest)


    response = logic.validateResponse(result)

    return logic.final(response, res)

}

// Fetch Product Listing by Product ID
api.getProductByProductID = async (req, res) => {
    const payload = `productid`.split(',');
    let notifications = '';
    let bind = ''
    let arrRequest = []
    for (let field of payload) {
        notifications += logic.validatePayload(req.params, field)
        //request = request.replace(field, mysql.escape(req.params[field]))
        if (notifications === '') {
            if (bind != '')
                bind += ','
            bind += `?`
            if (typeof req.params[field] === 'string')
                arrRequest.push(req.params[field])

            if (typeof req.params[field] === 'number')
                arrRequest.push(Number(req.params[field]))

            if (typeof req.params[field] === 'boolean')
                arrRequest.push(Boolean(req.params[field]))
        }
    }
    if (notifications != '')
        return res.send([logic.response(2, notifications)])

    const sqlq = require('../config/rawsql')
    // const result = await sqlq.query(`call psp_get_product_by_product_id (${request})`)
    const result = await sqlq.query(`call psp_get_product_by_product_id (${bind})`, arrRequest)
    response = logic.validateResponse(result)
    return logic.final(response, res)

}

module.exports = api