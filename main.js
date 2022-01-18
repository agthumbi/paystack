const app = require('express')();
const cors = require('cors');
const connection = require('./config/connpool.js')
const bodyParser = require('body-parser');
app.use('*', cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 80;
var main = {}
main.run = async () => {
    var path = require('path');
    global.basePath = await path.resolve(__dirname);
    global.pool = await connection.pool
    global.poolConnect = await connection.poolConnect


    const api = await require('./apis/index.js');

    app.get('/', api.index);
    app.get('/status', api.status);

    app.get('/catgories/fetch', api.getProductsCategory);
    app.get('/products/categoryid/fetch/:categoryid', api.getProductsByCategoryID);
    app.get('/products/productid/fetch/:productid', api.getProductByProductID);


    app.get('/cart/session/fetch/:sessionid', api.getViewCart);
    app.put('/cart/session/remove/:sessionid', api.getRemoveCart);
    app.put('/cart/session/update', api.getEditCart);
    app.put('/cart/session/checkout/:sessionid', api.getCheckout);
    app.post('/cart/session/add', api.getAddCart);

    app.listen(port, function (err) {


        console.log(`Paystack api listening at http://localhost:${port}`)
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });

    return main
}
module.exports = main
