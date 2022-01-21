const logic = require('../config/logic')

var api = {}

var response={}

api.getProductsCategory = async (req, res) => {

    const sqlq = require('../config/rawsql')
    const result = await sqlq.query('call psp_get_categories();')
    response = logic.validateResponse(result)

    res.send(response)
}
api.getProductsByCategoryID = async (req, res) => {
    let request = `categoryid`
    const payload = `categoryid`.split(',');
    let notifications = '';
    for (let field of payload) {
        notifications += logic.validatePayload(req.params, field)
        request = request.replace(field, req.params[field])
    }
    if (notifications != '')
        return res.send([logic.response(2, notifications)])
        
    const categoryid = req.params.categoryid
    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_get_products_by_categoryId(${request})`)

    response = logic.validateResponse(result)
 
   
    return res.json(response)

}
api.getProductByProductID = async (req, res) => {
    let request = `productid`
    const payload = `productid`.split(',');
    let notifications = '';
    for (let field of payload) {
        notifications += logic.validatePayload(req.params, field)
        request = request.replace(field, req.params[field])
    }
    if (notifications != '')
        return res.send([logic.response(2, notifications)])

    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_get_product_by_product_id (${request})`)
    response = logic.validateResponse(result)

    res.send(response)
}

module.exports = api