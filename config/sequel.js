var path = require('path');
const basePath = path.resolve(__dirname);

var fs = require('fs');
var seq = {}


//Read existing nonces
seq.storeNonce = async (arrString) => {
    return await new Promise((resolve, reject) => {
        fs.writeFile(`${basePath}/nonces`, arrString, (err) => {
            if (err)
                reject(err);

            resolve("Saved!")
            return
        })
    })


}

//Append new nonce into existing nonces
seq.readStoredNonce = () => {

    return new Promise((resolve, reject) => {
        fs.readFile(`${basePath}/nonces`, 'utf8', (err, data) => {
            if (err)
                reject(err);
            resolve(data)

        })

    })




}
//Read existing session
seq.storeTestingSession = async (arrString) => {
    return await new Promise((resolve, reject) => {
        fs.writeFile(`${basePath}/session`, arrString, (err) => {
            if (err)
                reject(err);

            resolve("Saved!")
            return
        })
    })


}

//Append new nonce into existing nonces
seq.readStoredTestingSession = () => {

    return new Promise((resolve, reject) => {
        fs.readFile(`${basePath}/session`, 'utf8', (err, data) => {
            if (err)
                reject(err);
            resolve(data)

        })

    })




}
module.exports = seq