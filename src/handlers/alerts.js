'use strict';

const axios = require("axios");
const config = require('config');
const client = require('prom-client');

const totalAlertCounter = new client.Counter({
	name: 'am_total_alerts_req',
	help: 'Total Request Count of Alert Manager GET /alerts'
});

const totalAlertErrorCounter = new client.Counter({
	name: 'am_total_error_alerts_req',
	help: 'Total Failed Request Count of Alert Manager GET /alerts'
});

const em7Severity = {
    CRITICAL: 'critical',
    MAJOR: 'major',
    MINOR: 'minor',
    NOTICE: 'notice',
    HEALTHY: 'healthy'
}

const formatAlert = (name,
					 instance,
					 severity,
					 timestamp,
					 desc) => {
	return {
		"name": name,
		"instance": instance,
		"severity": severity,
		"activeAt": timestamp,
		"description": desc
	};
}

const getData = async url => {
	try {
		const response = await axios.get(url);
		const rules = response.data || ""; // refer to README.md for expected format

		const outgoingAlerts = []
		for (let rule of rules) {
			const alerts = rule.evalData.evalMatches || [];

			for (let alert of alerts) {
				if (rule.state == "alerting") {
					outgoingAlerts.push(formatAlert(rule.name, alert.tags.instance, em7Severity.MAJOR, rule.newStateDate, rule.name));
				}
			}

			// errors can prevent alerts from firing, so make sure to include errors that do so
			if(alerts.length == 0 && rule.evalData.error) {
				outgoingAlerts.push(formatAlert(rule.name, null , em7Severity.MAJOR, rule.newStateDate, rule.evalData.error));
			}
		}

		return JSON.stringify(outgoingAlerts);
	} catch (error) {
		console.error(error);
		totalAlertErrorCounter.inc();
		return "[]";

	}
};

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
	 */
	get: function AlertsGet(request, h) {
		const url = config.get("grafana.server.endpoint") + "api/alerts";
		totalAlertCounter.inc();

		return getData(url);
	},
};
