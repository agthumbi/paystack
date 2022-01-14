var q = {}
const connection = require('./connpool')
q.query = async (rawquery) => {

    //try {
    //  await poolConnect;


    return new Promise((resolve, reject) => {
        pool.query(rawquery, async(err, result) => {
            if (err) {
                const result = await connection.handleConPool(err)
                await connection.recon()
                console.error('SQL error', 'Reconnecting....');
                global.pool = await connection.pool
                global.poolConnect = await connection.poolConnect
                console.error('Connection', 'Connection is back....');
                resolve([result])
                return
            }

            resolve(result[0])
            return
        })
    })


    // const result = pool.query(rawquery, (err, result) => {
    //     if (err)
    //         return err

    //     return result;
    // })
    return result;

    // } catch (err) {

    //     const result = await connection.handleConPool(err)
    //     await connection.recon()
    //     console.error('SQL error', 'Reconnecting....');
    //     global.pool = await connection.pool
    //     global.poolConnect = await connection.poolConnect
    //     console.error('Connection', 'Connection is back....');
    //     return result

    // }

}
module.exports = q