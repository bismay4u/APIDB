/*
 * All Routing Logic is written here
 * 
 * */
module.exports = function(server,restify) {

    server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
        res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
        next();
      });


    server.opts("*", function (req,res,next) {
        res.send(200);
        return next();
    });

    server.get('*', (req, res, next) => {
      res.send("Not Found");
      return next();
    });
  
    server.get('/', (req, res, next) => {
        res.header('content-type', 'json');
        res.send({
          "SERVER":server.config.name,
          "VERSION":server.config.version,
          "TIMESTAMP":new Date()
        });
      return next();
    });

    server.get('/_tables', (req, res, next) => {
      dbKey = req.header("x-apidb-dbkey");
      if(dbKey==null) {
        return next(
          new server.errors.ForbiddenError("APIKEY Invalid")
        );
      }
      res.send("No Tables Found");
      return next();
    });
  
    server.get('/_stats', (req, res, next) => {
        var os = require('os');

        res.header('content-type', 'json');
        res.send({
          "SERVER":server.config.name,
          "VERSION":server.config.version,
          "TIMESTAMP":new Date(),
          "totalmem":Math.floor((os.totalmem()/(1024*1024)))+" MB",
          "freemem":Math.floor((os.freemem()/(1024*1024)))+" MB",
          "processmem":Math.floor(process.memoryUsage().heapUsed/(1024*1024))+" MB",
          "cpus":os.cpus().length,
        });
        return next();
    });

    server.get('/_list', (req, res, next) => {
      res.header('content-type', 'json');
      res.send([

      ]);
      return next();
    });

    server.get('/test', (req, res, next) => {
        res.send({
            "BODY":req.body,
            "QUERY":req.query,
            "PARAMS":req.params,
            "HEADERS":req.headers,
            //"GUID":req.get("GUID"),
            //"DEVID":req.body.devid,
        });
        return next();
    });
}
