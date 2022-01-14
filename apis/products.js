

var api = {}

let response = [{ code: 1, message: 'Record(s) do not exists' }]

api.getProductsCategory = async (req, res) => {

   
    const sqlq = require('../config/rawsql')
    const result = await sqlq.query('call becode.psp_get_categories();')


    if (result != undefined)
        response = result

    res.send(response)
}
api.getProductsByCategoryID = async (req, res) => {

 
    const categoryid = req.params.categoryid
    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_get_products_by_categoryId(${categoryid})`)
    let response = {}

    if (result != undefined)
        response = result

    res.send(response)
}
api.getProductByProductID = async (req, res) => {

    const productid = req.params.productid
    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_get_product_by_product_id (${productid})`)
    let response = {}

    if (result === undefined)
        response = [{ code: 1, message: 'Record(s) do not exists' }]
    else
        response = result

    res.send(response)
}

module.exports = api