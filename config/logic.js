const logic = {}
//error handler for all responses
logic.response = (num, msg = '') => {
    const res = [
        { code: 'E1', message: 'Something wento wrong.Please try again..' },
        { code: 'E2', message: 'No Record(s) Exists' },
        { code: 'E0', message: msg }
    ]

    return res[num]

}
logic.final = (arr, res) => {
    if (arr.totalAmount != undefined)
        arr = arr.result


    if (arr[0].code != undefined) {
        switch (arr[0].code) {
            case 'E1':
                return res.status(500).json(arr)
            case 'E2':
                return res.status(404).json(arr)
            case 'E0':
                return res.status(400).json(arr)


        }
    }



    return res.status(200).json(arr)
}
//General response handler
logic.validateResponse = (result) => {
    if (result === undefined)
        return [logic.response(0)]
    else if (result.length <= 0)
        return [logic.response(1)]
    else if (result[0].code != undefined && result[0].code != 0)
        return [logic.response(result[0].code, result[0].message)]
    else
        return result

}
//error handler for all requests
logic.validatePayload = (payload, field) => {
    if (payload[field] === undefined || payload[field] === '')
        return `${field} cannot be blank.Please enter a valid ${field}\n`;
    return ''
}
logic.validateSignature = async (headers) => {
    const defaultResult = [logic.response(2, 'Authentication Failed.Invalid signature')]
    const { timestamp, nonce, signature } = headers
    const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)
    const matchSignature = await getSignature(cipher)
    if ((matchSignature) === (signature))
        return null
    return defaultResult
};
logic.getSignature = (text) => {
    var hash = CryptoJS.SHA256(text);
    const secret_uffer = CryptoJS.enc.Base64.parse('Paystack is de best');
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secret_uffer)
    hmac.update(hash, secret_uffer)
    return hash.toString(CryptoJS.enc.Base64);
};
module.exports = logic