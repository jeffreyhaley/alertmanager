'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const promClient = require('prom-client');
const config = require('config');

const promRegister = promClient.register;



const init = async () => {

    const server = Hapi.server({
        port: config.get("core.port"),
        host: config.get("core.host")
    });

    await server.register({
        plugin: require('hapi-openapi'),
        options: {
            api: Path.join(__dirname, './config/openapi-2.0.yaml'),
            handlers: Path.join(__dirname, './handlers')
        }
    });


    server.route({
        method: 'GET',
        path: '/metrics',
        handler: (request, h) => {
            return promRegister.metrics();
        }
    });


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();