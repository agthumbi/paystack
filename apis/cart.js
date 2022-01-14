

var api = {}

let response = [{ code: 1, message: 'Something wento wrong.Please try again..' }]
//Add Cart function
api.getAddCart = async (req, res) => {
    let request = `productid,isGuest,'session_id',p_qty`
    const payload = `productid,isGuest,session_id,p_qty`.split(',');
    let notifications = '';
    for (let field of payload) {
        if (req.body[field] === undefined || req.body[field] === '')
            notifications += `${field} cannot be blank.Please enter a valid ${field}\n`;
        request = request.replace(field, req.body[field])
    }
    if (notifications != '')
        return res.send([{ code: 1, message: notifications }])

    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_add_cart_by_session_id(${request})`)

    if (result != undefined)
        response = result

    res.send(response)
}
//Update Cart function
api.getEditCart = async (req, res) => {


    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_update_cart_by_session_id`)
    // let response = {}

    if (result != undefined)
        response = result

    res.send(response)
}
//Remove Cart function
api.getRemoveCart = async (req, res) => {

    console.log(req.body)
    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_delete_cart_by_session_id`)
    //let response = {}

    if (result != undefined)
        response = result

    res.send(response)
}
api.getViewCart = async (req, res) => {

    console.log(req.body)
    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_view_cart_by_session_id`)
    //let response = {}

    if (result != undefined)
        response = result

    res.send(response)
}
api.getCheckout = async (req, res) => {

    console.log(req.body)
    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_checkout_cart_by_session_id`)
    // let response = {}

    if (result != undefined)
        response = result

    res.send(response)
}
module.exports = api