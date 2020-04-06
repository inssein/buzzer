const express = require("express");

exports.initializeServer = () => {
  // start an express app to serve a plain page
  const app = express();

  // serve a basic api
  app.use(require("./api"));

  // serve public folder
  app.use(express.static("public"));

  // start server
  app.listen(80);
};
