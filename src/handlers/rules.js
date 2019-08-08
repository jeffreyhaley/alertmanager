'use strict';

const axios = require("axios");
const config = require('config');
const client = require('prom-client');


const totalRuleCounter = new client.Counter({
	name: 'am_total_rules_req',
	help: 'Total Request Count of Alert Manager GET /rules'
});

const totalRuleErrorCounter = new client.Counter({
	name: 'am_total_error_rules_req',
	help: 'Total Failed Request Count of Alert Manager GET /rules'
});



/**
 * Operations on /rules
 */
module.exports = {
	/**
	 * summary: getRules
	 * description: Get a list of rules
	 * parameters: 
	 * produces: application/json
	 * responses: 200, 400, 404, default
	 */
	get: function RulesGet(request, h) {
		const url = config.get("grafana.server.endpoint") + "api/alerts";

		const getData = async url => {
			try {
				const response = await axios.get(url);
				const rules = response.data || "";

				const outgoingAlerts = []
				for (let rule of rules) {
					outgoingAlerts.push({
						"name": rule.name,
						"instance": "",
						"severity": "",
						"activeAt": "",
						"description": rule.name
					});
				}

				return JSON.stringify(outgoingAlerts);
			} catch (error) {
				console.error(error);
				totalRuleErrorCounter.inc();
				return "[]";
			}
		};

		return getData(url);
	}
};
