

var api = {}

let response = [{ code: 1, message: 'Something wento wrong.Please try again..' }]

api.getAddCart = async (req, res) => {

    console.log(req.body)
    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_add_cart_by_session_id(${request})`)
    //let response = {}

    if (result != undefined)
        response = result

    res.send(response)
}
api.getEditCart = async (req, res) => {


    const sqlq = require('../config/rawsql')
    const result = await sqlq.query(`call psp_update_cart_by_session_id`)
    // let response = {}

    if (result != undefined)
        response = result

    res.send(response)
}
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