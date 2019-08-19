/*
 * All Routing Logic is written here
 * 
 * */
module.exports = function (server, restify) {

  server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));

    //res.setHeader('Access-Control-Allow-Origin', 'http://polleze.com');
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token');
    // res.setHeader('Access-Control-Allow-Methods', '*');
    // res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    // res.setHeader('Access-Control-Max-Age', '1000');
    next();
  });

  server.opts("*", function (req, res, next) {
    res.send(200);
    return next();
  });

  server.get('*', (req, res, next) => {
    res.send(404);
    return next();
  });

  server.get('/', (req, res, next) => {
    if (CONFIG.allow_home_info) {
      res.header('content-type', 'json');
      res.send({
        "SERVER": server.config.name,
        "VERSION": server.config.version,
        "TIMESTAMP": new Date()
      });
    } else {
      res.header('content-type', 'json');
      res.send({
        "SERVER": server.config.name,
        "TIMESTAMP": new Date()
      });
    }
    return next();
  });

  server.get('/admin', (req, res, next) => {
    res.header('content-type', 'json');
    res.send([

    ]);
    return next();
  });
  server.get('/admin/_stats', (req, res, next) => {
    var os = require('os');

    res.header('content-type', 'json');
    res.send({
      "SERVER": server.config.name,
      "VERSION": server.config.version,
      "TIMESTAMP": new Date(),
      "totalmem": Math.floor((os.totalmem() / (1024 * 1024))) + " MB",
      "freemem": Math.floor((os.freemem() / (1024 * 1024))) + " MB",
      "processmem": Math.floor(process.memoryUsage().heapUsed / (1024 * 1024)) + " MB",
      "cpus": os.cpus().length,
      "connections": __.getConnectionLength(),
    });
    return next();
  });

  server.get('/admin/_list', (req, res, next) => {
    res.header('content-type', 'json');
    connectionList = Object.keys(CONNECTPARAMS);
    res.send(connectionList);
    return next();
  });

  server.get('/admin/restart', (req, res, next) => {
    res.header('content-type', 'json');
    res.send({"status":"ok"});
    process.exit();
    return next();
  });

  //For testing purpose
  server.get('/test', (req, res, next) => {
    if (!CONFIG.debug) {
      res.send(404);
      return next();
    }
    res.header('content-type', 'json');
    res.send({
      "DEBUG": CONFIG.debug,
      "BODY": req.body,
      "QUERY": req.query,
      "PARAMS": req.params,
      "HEADERS": req.headers,
      //"GUID":req.get("GUID"),
      //"DEVID":req.body.devid,

      "CONNECT": CONNECTPARAMS
    });
    return next();
  });
}
