var path = require('path');
const basePath = path.resolve(__dirname);

var fs = require('fs');
var seq = {}


//Read existsing nonces
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
module.exports = seq