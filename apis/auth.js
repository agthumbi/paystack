
var api = {}
var logic = require('../config/logic')
api.authenticate = async (req, res, next) => {
    const checkSignature = logic.validateSignature(req.headers)
    if (checkSignature != null)
        return res.status(403).json(checkSignature)
    else
        return next();

};

module.export = api