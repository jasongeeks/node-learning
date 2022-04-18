const express = require('express');
const bodyParser = require('body-parser');
const pgPool = require('./util/postgres-pool');
const app = express();
const winston = require('winston');
const index = require('./routes/index');
const config = require('./config/config');
const logging = require('./util/middleware/logging');
const authenticate = require('./util/middleware/authentication');
logging.initLogging();
pgPool.init();

const pathPrefix = '/restful-demo/';

const env = app.get('env');
const port = 3000;

winston.info(`Starting app in ${env} environment.`);
winston.info(`Config: ${JSON.stringify(config, null, 2)}`);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(authenticate);
app.use(pathPrefix, index);

app.all('/', (req, res) => res.redirect(pathPrefix));

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
