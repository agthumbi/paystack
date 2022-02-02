const app = require('express')();
const helmet = require('helmet')
const cors = require('cors');
const morgan = require('morgan')
const connection = require('./config/connpool.js')
const bodyParser = require('body-parser');

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 80;




//Application run

var path = require('path');
global.basePath = path.resolve(__dirname);
global.pool = connection.pool
global.poolConnect = connection.poolConnect

const api = require('./apis/index.js');

app.use(api.authenticate);
app.get('/', api.index);
app.get('/status', api.status);

app.get('/catgories/fetch', api.getProductsCategory);
app.get('/products/categoryid/fetch/:categoryid', api.getProductsByCategoryID);
app.get('/products/productid/fetch/:productid', api.getProductByProductID);


app.get('/cart/session/fetch/:sessionid', api.getViewCart);
app.put('/cart/session/remove/:sessionid', api.getRemoveCart);
app.put('/cart/session/remove/item/:sessionid/:productid', api.getRemoveItemCart);

app.put('/cart/session/update', api.getEditCart);
app.put('/cart/session/checkout/:sessionid', api.getCheckout);
app.post('/cart/session/add', api.getAddCart);



app.run = () => {

    app.listen(port, (err) => {

        console.log(`Paystack api listening at http://localhost:${port}`)
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}

module.exports = app
