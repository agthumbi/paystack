var path = require('path');
const basePath = path.resolve(__dirname);
global.sq = 1
global.sq2 = 2
var fs = require('fs');
var seq = {}


seq.readSeq = () => {


    fs.readFile(`${basePath}/seq`, 'utf8', async (err, data) => {

        if (err)
            throw (err);

        sq = data
        sq2 = Number(data) + 1

    })







};


seq.storeSeq = (num) => {

    fs.writeFile(`${basePath}/seq`, num, async (err) => {
        if (err)
            throw (err);


        return
    })



}
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