require('dotenv').config();
const express = require('express');
const swaggerTools = require('swagger-tools');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const yaml = require('js-yaml');

const swaggerDoc = yaml.safeLoad(fs.readFileSync('./api/swagger/swagger.yaml'));
const swaggerConfig = require('./config/swagger.config');
const constants = require('./config/constants');
const message = require('./config/message');

const port = constants.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  app.use(middleware.swaggerMetadata());

  app.use(middleware.swaggerValidator());

  app.use(middleware.swaggerRouter(swaggerConfig));

  app.use(middleware.swaggerUi());

  app.listen(port);
  console.log(message[Math.floor(Math.random() * message.length)].replace(RegExp('THEPORT', 'g'), port));
});

module.exports = app;
