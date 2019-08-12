/*
 * All Routing Logic is written here
 * 
 * */
module.exports = function(server,restify) {

    server.pre((req, res, next) => {
      // res.header('Access-Control-Allow-Origin', '*');
      // res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, Content-Disposition, Origin, X-Requested-With');
      // res.header('Access-Control-Allow-Credentials', 'true');
      // res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, OPTIONS, PUT');
      // res.header('Allow', 'DELETE, GET, POST, OPTIONS, PUT');
      // res.header('access-control-max-age', 86400);
  
      return next();
    });

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
      connectionList = Object.keys(CONNECTPARAMS);
      res.send(connectionList);
      return next();
    });

    server.get('/test', (req, res, next) => {
        res.header('content-type', 'json');
        res.send({
            "BODY":req.body,
            "QUERY":req.query,
            "PARAMS":req.params,
            "HEADERS":req.headers,
            //"GUID":req.get("GUID"),
            //"DEVID":req.body.devid,

            "CONNECT":CONNECTPARAMS
        });
        return next();
    });
}
