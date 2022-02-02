const logic = require('../config/logic')
var api = {}


api.authenticate = async (req, res, next) => {

    //default error handler for auth
    const defaultSepcialCharacters = [logic.response(2, 'Sending of special characters is forbidden')]
    const defaultESignature = [logic.response(2, 'Authentication Failed.Invalid signature')]
    const defaultTimeStamp = [logic.response(2, 'Authentication Failed.Invalid Timestamp')]
    const defaultENonce = [logic.response(2, 'Authentication Failed.Invalid Nonce')]     //leave out status and welcome page
    let headers = req.headers
    const { nonce, timestamp, signature } = headers
    //Check special characters on endpoints
    if (logic.CheckSpecialCharacters(req.url))
        return res.status(403).json(defaultSepcialCharacters)

    //Leave alone status and landing page requests
    if (req.url === '/' || req.url === '/status')
        return next();
    //check if nonce is provided
    if (nonce === null || nonce === '' || nonce === undefined)
        return res.status(403).json(defaultENonce)
    //check if timestamp  is provided
    if (timestamp === null || timestamp === '' || timestamp === undefined)
        return res.status(403).json(defaultTimeStamp)
    //check if signature is provided
    if (signature === null || signature === '' || signature === undefined)
        return res.status(403).json(defaultESignature)




    //check for existing nonce
    const checkNonce = await logic.ValidNonce(nonce)

    //check time stamp is not out of window
    const checkTimestampWindow = logic.ValidateStamp(timestamp)
    //check signature match
    const checkSignature = logic.validateSignature(headers)


    //validate timestamp,signature and nonce
    if (!checkSignature && !checkTimestampWindow && !checkNonce)
        return res.status(403).json(defaultESignature)
    else
        return next();

};

module.exports = api