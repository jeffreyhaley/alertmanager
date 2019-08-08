# alertaggregator

Swagger api [location](./config/swagger.yaml)


handlers/alerts.js > getData expects JSON from Grafana as an array of "rule" objects. Each "rule" is expected to follow one of these two examples (differing by evalData contents):

* Example without errors

        {
            "id": 7,
            "dashboardId": 6,
            "dashboardUid": "zzmC5dVZz",
            "dashboardSlug": "prp-dashboard-v1-1-0",
            "panelId": 39,
            "name": "BMS Request Rate - % Over 30ms alert",
            "state": "ok",
            "newStateDate": "2019-07-18T20:18:12Z",
            "evalDate": "0001-01-01T00:00:00Z",
            "evalData": {
                "evalMatches": [
                    {
                        "metric": "{instance=\"10.96.56.109:19112\", job=\"prp-prod\"}",
                        "tags": {
                            "instance": "10.96.56.109:19112",
                            "job": "prp-prod"
                        },
                        "value": 0.12182545635069449
                    },
                    {
                        "metric": "{instance=\"10.96.56.110:19112\", job=\"prp-prod\"}",
                        "tags": {
                            "instance": "10.96.56.110:19112",
                            "job": "prp-prod"
                        },
                        "value": 0.12103174603174602
                    },
                    
                    ... omitted  ...

                    {
                        "metric": "{instance=\"10.96.56.93:19112\", job=\"prp-prod\"}",
                        "tags": {
                            "instance": "10.96.56.93:19112",
                            "job": "prp-prod"
                        },
                        "value": 0.20634920634920634
                    }
                ]
            },
            "executionError": "",
            "url": "/d/zzmC5dVZz/prp-dashboard-v1-1-0"
        }

* Example with server error

        {
            "id": 5,
            "dashboardId": 5,
            "dashboardUid": "GuovJD7Zk",
            "dashboardSlug": "bmsu-dashboard-v2-0-1",
            "panelId": 9,
            "name": "Logged Fatal Errors alert",
            "state": "pending",
            "newStateDate": "2019-07-17T17:50:24Z",
            "evalDate": "0001-01-01T00:00:00Z",
            "evalData": {
                "error": "tsdb.HandleRequest() error server_error: server error: 503"
            },
            "executionError": "tsdb.HandleRequest() error server_error: server error: 503",
            "url": "/d/GuovJD7Zk/bmsu-dashboard-v2-0-1"
        }