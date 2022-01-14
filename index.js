var cluster = require('cluster');
const clster = require('./cluster');
const main = require('./main');
if (cluster.isMaster) {
    clster.run(cluster)
} else {
    main.run()
}