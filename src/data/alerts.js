'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /alerts
 */
module.exports = {
    /**
     * summary: getAlerts
     * description: Get a list of alerts
     * parameters: 
     * produces: application/json
     * responses: 200, 400, 404, default
     * operationId: AlertsGet
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/alerts',
                operation: 'get',
                response: '200'
            }, callback);
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/alerts',
                operation: 'get',
                response: '400'
            }, callback);
        },
        404: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/alerts',
                operation: 'get',
                response: '404'
            }, callback);
        },
        default: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/alerts',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    }
};
