const logic = {}
const CryptoJS = require('crypto-js')
//var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
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

logic.CheckSpecialCharacters = (string) => {

    const specialCharsSet = new Set("!@#$%^&*()_");
    for (let letter of string) {
        if (specialCharsSet.has(letter)) {
            return true;
        }
    }
    return false;
}
logic.ValidNonce = async (nonce) => {


    const seq = require('./sequel')




    var arr = await seq.readStoredNonce();

    arr = JSON.parse(arr)
    if (arr.includes(nonce))
        return false


    let newArr = [...arr]
    newArr.push(nonce)



    await seq.storeNonce(JSON.stringify(newArr))
    return true




}
logic.GetSameSession = async () => {


    const seq = require('./sequel')
    var max = 0;



    var arr = await seq.readStoredTestingSession();

    arr = JSON.parse(arr)

    let newArr = [...arr]
    if (newArr.length <= 0) {
        newArr.push(1)
        await seq.storeTestingSession(JSON.stringify(newArr))
        return 1

    }
    else {
        max = Math.max(...newArr)
        return max
    }




}
logic.GetSession = async () => {


    const seq = require('./sequel')
    var max = 0;



    var arr = await seq.readStoredTestingSession();

    arr = JSON.parse(arr)





    let newArr = [...arr]
    if (newArr.length <= 0) {
        newArr.push(1)
        await seq.storeTestingSession(JSON.stringify(newArr))
        return 1

    }
    else {
        max = Math.max(...newArr)
        newArr.push(Number(max) + 1)


        await seq.storeTestingSession(JSON.stringify(newArr))
        return Number(max) + 1
    }




}
logic.ValidateStamp = (timestamp) => {


    const systamp = logic.timestamp()
    const timeWindow = Number(systamp) - Number(timestamp)
    if (timeWindow >= 0 && timeWindow <= 5)
        return true

    return false



}
logic.validateSignature = (headers) => {
    const { timestamp, nonce, signature } = headers



    const cipher = (timestamp) + '$$PAYSTACK$$' + (nonce)

    const matchSignature = logic.getSignature(cipher)

    if ((matchSignature) === (signature))
        return true
    return false
};
logic.getSignature = (text) => {
    var hash = CryptoJS.SHA256(text);
    const secret_uffer = CryptoJS.enc.Base64.parse('Paystack is de best');
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secret_uffer)
    hmac.update(hash, secret_uffer)
    return hash.toString(CryptoJS.enc.Base64);
};
logic.guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4() + s4() +
        s4() + s4() + s4() + s4();
}

logic.timestamp = () => {
    return Date.now() / 1000 | 0;
}
module.exports = logic