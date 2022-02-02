var q = {}
const connection = require('./connpool')
q.query = async (rawquery,array) => {

    //try {
    //  await poolConnect;

    
    return new Promise((resolve, reject) => {
        pool.query(rawquery,array, async(err, result) => {
            
            if (err) {
                const result =  connection.handleConPool(err)
                 connection.recon()
                console.error('SQL error', 'Reconnecting....');
                global.pool =  connection.pool
                global.poolConnect =  connection.poolConnect
                console.error('Connection', 'Connection is back....');
                resolve([result])
                return
            }

            resolve(result[0])
            return
        })
    })


 

}
module.exports = q