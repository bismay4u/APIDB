/*
 * APIDB Server
 * 
 * @author : Bismay <bismay@smartinfologiks.com>
 * */

const config = require('./config/apidb');
const env = {};
/**
 * Loading all plugin packages required
 */
const restify = require('restify');
const restifyPlugins = require('restify-plugins');
const errors = require('restify-errors');

const fs = require('fs');
const path = require('path');
const bunyan = require('bunyan');

env.moment = require('moment');
env._ = require('lodash');

/**
 * Create A Logger, may be we will remove this in future
 */
const logger = bunyan.createLogger({
    name: config.name,
    streams: [{
        level: 'error',
        path: './logs/error.log' // log ERROR and above to a file
    }]
});


const server = restify.createServer({
    name: config.name,
    version: config.version,

    dtrace: false,
    log: logger,
    ignoreTrailingSlash: true
});
server.config = config;
server.env = env;
server.errors = errors;

require('./api/misc')(server, restify);
require('./api/plugins')(server, restify);
require('./api/middleware')(server, restify);

require('./api/security')(server, restify);
require('./api/routes')(server, restify); 

/**
 * Start Server, Checks for availale PORTs
 */
server.listen(config.port, () => {
    // console.log(config);

    console.log(`${config.name} is listening on port ${config.port}`);
});