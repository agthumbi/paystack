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
module.exports = logic