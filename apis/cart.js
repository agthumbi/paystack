const logic = require('../config/logic')
const mysql = require('mysql2')

var api = {}
var response = {}

//Add Cart function
api.getAddCart = async (req, res) => {
    let request = `productid,isGuest,session_id,qty`
    const payload = `productid,isGuest,session_id,qty`.split(',');
    let notifications = '';
    for (let field of payload) {
        notifications += logic.validatePayload(req.body, field)
        request = request.replace(field, mysql.escape(req.body[field]))
    }

    if (notifications != '')
        return res.send([logic.response(2, notifications)])



    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_add_cart_by_session_id(${request});`)

    response = logic.validateResponse(result)
    return logic.final(response, res)
}

//Update Cart function
api.getEditCart = async (req, res) => {
    let request = `productid,isGuest,session_id,qty`
    const payload = `productid,isGuest,session_id,qty`.split(',');
    let notifications = '';
    for (let field of payload) {
        notifications += logic.validatePayload(req.body, field)
        request = request.replace(field, mysql.escape(req.body[field]))
    }
    if (notifications != '')
        return res.send([logic.response(2, notifications)])
    const sqlq = require('../config/rawsql')

    const result = await sqlq.query(`call psp_update_cart_by_session_id (${request});`)
    console.log(result)
    response = logic.validateResponse(result)

    return logic.final(response, res)
}

//Remove Whole Item in a Cart function
api.getRemoveCart = async (req, res) => {
    let request = `sessionid`
    const payload = `sessionid`.split(',');
    let notifications = '';
    for (let field of payload) {
        notifications += logic.validatePayload(req.params, field)
        request = request.replace(field, mysql.escape(req.params[field]))
    }
    if (notifications != '')
        return res.send([logic.response(2, notifications)])
    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_delete_cart_by_session_id (${request});`)
    response = logic.validateResponse(result)

    return logic.final(response, res)
}

//Remove an  item in a Cart function
api.getRemoveItemCart = async (req, res) => {
    let request = `sessionid,productid`

    const payload = `sessionid,productid`.split(',');
    let notifications = '';
    for (let field of payload) {
        notifications += logic.validatePayload(req.params, field)
        request = request.replace(field,mysql.escape(req.params[field]))
    }
    if (notifications != '')
        return res.send([logic.response(2, notifications)])
    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call delete_cart_by_product_id (${request});`)
    response = logic.validateResponse(result)

    return logic.final(response, res)
}

//View Cart function
api.getViewCart = async (req, res) => {
    let totalAmount = 0
    let request = `sessionid`
    const payload = `sessionid`.split(',');
    let newResult = []
    let notifications = '';
    for (let field of payload) {
        notifications += logic.validatePayload(req.params, field)
        request = request.replace(field, mysql.escape(req.params[field]))
    }

    if (notifications != '')
        return res.send([logic.response(2, notifications)])
    const sqlq = require('../config/rawsql')
    let details = await sqlq.query(`call psp_view_cart_by_session_id (${request});`)

    response = logic.validateResponse(details)
    if (details.length > 0 && details[0].amount != undefined) {
        totalAmount = details.reduce((accum, item) => accum + item.amount, 0)
        response = { totalAmount: totalAmount, result: details }
    }


    return logic.final(response, res)
}

//view checkout function
api.getCheckout = async (req, res) => {
    let request = `sessionid`
    const payload = `sessionid`.split(',');
    let notifications = '';
    for (let field of payload) {
        notifications += logic.validatePayload(req.params, field)
        request = request.replace(field, mysql.escape(req.params[field]))
    }
    if (notifications != '')
        return res.send([logic.response(2, notifications)])
    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_checkout_cart_by_session_id (${request})`)
    response = logic.validateResponse(result)

    return logic.final(response, res)
}
module.exports = api