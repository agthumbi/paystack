const logic = require('../config/logic')
const mysql = require('mysql2')

var api = {}
var response = {}

//Add Cart function
api.getAddCart = async (req, res) => {
    // let request = `productid,isGuest,session_id,qty`
    const payload = `productid,isGuest,session_id,qty`.split(',');
    arrRequest = []
    let notifications = '', bind = '';
    for (let field of payload) {
        notifications += logic.validatePayload(req.body, field)
        // request = request.replace(field, mysql.escape(req.body[field]))
        if (notifications === '') {
            if (bind != '')
                bind += ','
            bind += `?`

            if (typeof req.body[field] === 'string')
                arrRequest.push(req.body[field])

            if (typeof req.body[field] === 'number')
                arrRequest.push(Number(req.body[field]))

            if (typeof req.body[field] === 'boolean')
                arrRequest.push(Boolean(req.body[field]))

        }
    }

    if (notifications != '')
        return res.send([logic.response(2, notifications)])



    const sqlq = require('../config/rawsql')
    //const result = await sqlq.query(`call psp_add_cart_by_session_id(${request});`)
    const result = await sqlq.query(`call psp_add_cart_by_session_id(${bind});`, arrRequest)

    response = logic.validateResponse(result)
    return logic.final(response, res)
}

//Update Cart function
api.getEditCart = async (req, res) => {
    // let request = `productid,isGuest,session_id,qty`
    const payload = `productid,isGuest,session_id,qty`.split(',');
    arrRequest = payload
    let notifications = '', bind = '';
    for (let field of payload) {
        notifications += logic.validatePayload(req.body, field)
        //request = request.replace(field, mysql.escape(req.body[field]))
        if (notifications === '') {
            if (bind != '')
                bind += ','
            bind += `?`
            if (typeof req.body[field] === 'string')
                arrRequest.push(req.body[field])

            if (typeof req.body[field] === 'number')
                arrRequest.push(Number(req.body[field]))

            if (typeof req.body[field] === 'boolean')
                arrRequest.push(Boolean(req.body[field]))
        }
    }
    if (notifications != '')
        return res.send([logic.response(2, notifications)])
    const sqlq = require('../config/rawsql')

    //const result = await sqlq.query(`call psp_update_cart_by_session_id (${request});`)
    const result = await sqlq.query(`call psp_update_cart_by_session_id (${bind});`, arrRequest)

    response = logic.validateResponse(result)

    return logic.final(response, res)
}

//Remove Whole Item in a Cart function
api.getRemoveCart = async (req, res) => {
    let request = `sessionid`
    const payload = `sessionid`.split(',');
    let notifications = '', bind = '';
    arrRequest = []
    for (let field of payload) {
        notifications += logic.validatePayload(req.params, field)
        // request = request.replace(field, mysql.escape(req.params[field]))
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
    //const result = await sqlq.query(`call psp_delete_cart_by_session_id (${request});`)
    const result = await sqlq.query(`call psp_delete_cart_by_session_id (${bind});`, arrRequest)
    response = logic.validateResponse(result)

    return logic.final(response, res)
}

//Remove an  item in a Cart function
api.getRemoveItemCart = async (req, res) => {
    //let request = `sessionid,productid`

    const payload = `sessionid,productid`.split(',');
    let notifications = '', bind = '';
    arrRequest = []
    for (let field of payload) {
        notifications += logic.validatePayload(req.params, field)
        //  request = request.replace(field, mysql.escape(req.params[field]))
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
    //  const result = await sqlq.query(`call delete_cart_by_product_id (${request});`)
    const result = await sqlq.query(`call psp_delete_cart_by_product_id (${bind});`, arrRequest)
    response = logic.validateResponse(result)

    return logic.final(response, res)
}

//View Cart function
api.getViewCart = async (req, res) => {
    let totalAmount = 0
    let request = `sessionid`
    const payload = `sessionid`.split(',');
    arrRequest = []
    let notifications = '', bind = '';
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
    //let details = await sqlq.query(`call psp_view_cart_by_session_id (${request});`)
    let details = await sqlq.query(`call psp_view_cart_by_session_id (${bind});`, arrRequest)

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
    arrRequest = []
  
    let notifications = '', bind = '';
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
    // const result = await sqlq.query(`call psp_checkout_cart_by_session_id (${request})`)
    const result = await sqlq.query(`call psp_checkout_cart_by_session_id (${bind})`, arrRequest)
    response = logic.validateResponse(result)

    return logic.final(response, res)
}
module.exports = api