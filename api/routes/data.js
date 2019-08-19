/*
 * All Routing Logic for database related tasks
 * 
 * */
module.exports = function (server, restify) {

  server.get('/_tables', (req, res, next) => {
    dbKey = req.header("x-apidb-dbkey");

    __.getDataConnection(dbKey, function (dataConnection) {
      if (!dataConnection) {
        return next(
          new server.errors.ForbiddenError("APIKEY Not Registered")
        );
      }

      dataConnection.listTables(function (collectionList) {
        res.header('content-type', 'json');
        res.send(collectionList);
        return next();
      });
    });
  });

  server.get('/:tableName', (req, res, next) => {
    dbKey = req.header("x-apidb-dbkey");
    tblName = req.params['tableName'];
    if (tblName == null || tblName.length <= 0) {
      return next(
        new server.errors.ForbiddenError("Missing Table Name")
      );
    }

    __.getDataConnection(dbKey, function (dataConnection) {
      if (!dataConnection) {
        return next(
          new server.errors.ForbiddenError("APIKEY Not Registered")
        );
      }

      sortBy = false;
      columns = null;
      filter = null;
      if (req.query['orderby'] != null && req.query['orderby'].length > 0) sortBy = req.query['orderby'];
      if (req.query['columns'] != null && req.query['columns'].length > 0) columns = req.query['columns'].split(",");
      try {
        if (req.query['filter'] != null && req.query['filter'].length > 0) filter = JSON.parse(req.query['filter']);
      } catch (e) {

      }
      // console.log(typeof filter,filter);

      dataConnection.listData({
        "dbkey": dbKey,
        "table": tblName,
        "columns": columns,
        "orderby": sortBy,
        "filter": filter
      }, function (recordSet) {
        res.header('content-type', 'json');
        res.send({ "data": recordSet, "max": 0 });
        return next();
      });
    });
  });

  server.post('/:tableName', (req, res, next) => {
    dbKey = req.header("x-apidb-dbkey");
    tblName = req.params['tableName'];
    if (tblName == null || tblName.length <= 0) {
      return next(
        new server.errors.ForbiddenError("Missing Table Name")
      );
    }

    __.getDataConnection(dbKey, function (dataConnection) {
      if (!dataConnection) {
        return next(
          new server.errors.ForbiddenError("APIKEY Not Registered")
        );
      }

      sortBy = false;
      columns = null;
      filter = null;
      if (req.body['orderby'] != null && req.body['orderby'].length > 0) sortBy = req.body['orderby'];
      if (req.body['columns'] != null && req.body['columns'].length > 0) columns = req.body['columns'].split(",");

      try {
        if (req.body['filter'] != null && req.body['filter'].length > 0) filter = JSON.parse(req.body['filter']);
      } catch (e) {

      }
      // console.log(typeof filter,filter);


      dataConnection.listData({
        "dbkey": dbKey,
        "table": tblName,
        "columns": columns,
        "orderby": sortBy,
        "filter": filter
      }, function (recordSet) {
        res.header('content-type', 'json');
        res.send({ "data": recordSet, "max": 0 });
        return next();
      });
    });
  });

  server.get('/:tableName/:idHash', (req, res, next) => {
    dbKey = req.header("x-apidb-dbkey");
    tblName = req.params['tableName'];
    idHash = req.params['idHash'];

    if (tblName == null || tblName.length <= 0) {
      return next(
        new server.errors.ForbiddenError("Missing Table Name")
      );
    }
    if (idHash == null || idHash.length <= 0) {
      return next(
        new server.errors.ForbiddenError("Missing Identifier Name")
      );
    }

    __.getDataConnection(dbKey, function (dataConnection) {
      if (!dataConnection) {
        return next(
          new server.errors.ForbiddenError("APIKEY Not Registered")
        );
      }

      columns = null;
      if (req.query['columns'] != null && req.query['columns'].length > 0) columns = req.query['columns'].split(",");

      dataConnection.fetchData({
        "dbkey": dbKey,
        "table": tblName,
        "columns": columns,
        "idhash": idHash
      }, function (recordDetails) {
        res.header('content-type', 'json');
        res.send({ "data": recordDetails });
        return next();
      });
    });
  });

  server.get('/:tableName/schema', (req, res, next) => {
    dbKey = req.header("x-apidb-dbkey");
    tblName = req.params['tableName'];
    if (tblName == null || tblName.length <= 0) {
      return next(
        new server.errors.ForbiddenError("Missing Table Name")
      );
    }

    __.getDataConnection(dbKey, function (dataConnection) {
      if (!dataConnection) {
        return next(
          new server.errors.ForbiddenError("APIKEY Not Registered")
        );
      }

      rebuild = req.params['rebuild'];
      if (rebuild == null) rebuild = false;

      dataConnection.getSchema({
        "dbkey": dbKey,
        "table": tblName,
        "rebuild": rebuild
      }, function (schema) {
        model = {};
        _.each(schema.paths, function (a, b) {
          model[b] = {
            "type": a.instance,
            "validator": a.validators,
            // "index": a._index
          };
        });

        res.header('content-type', 'json');
        res.send({ "model": model });

        return next();
      });
    });
  });

  server.post('/:tableName/create', (req, res, next) => {
    dbKey = req.header("x-apidb-dbkey");
    tblName = req.params['tableName'];
    if (tblName == null || tblName.length <= 0) {
      return next(
        new server.errors.ForbiddenError("Missing Table Name")
      );
    }

    __.getDataConnection(dbKey, function (dataConnection) {
      if (!dataConnection) {
        return next(
          new server.errors.ForbiddenError("APIKEY Not Registered")
        );
      }

      recordData = req.body;
      recordData[CONFIG.DB_SPECIAL_COLUMNS.CREATED_ON] = moment().format("YYYY-MM-DD HH:mm:ss");
      recordData[CONFIG.DB_SPECIAL_COLUMNS.UPDATED_ON] = recordData[CONFIG.DB_SPECIAL_COLUMNS.CREATED_ON];
      recordData[CONFIG.DB_SPECIAL_COLUMNS.SOFT_DELETE] = "false";

      dataConnection.insertData({
        "dbkey": dbKey,
        "table": tblName
      }, recordData, function (ans) {
        if (!ans || ans[0]._id == null) {
          res.header('content-type', 'json');
          res.send({ "status": false, "data": 0 });
        } else {
          res.header('content-type', 'json');
          res.send({ "status": true, "data": ans[0]._id });
        }

        return next();
      });
    });
  });

  server.put('/:tableName/:idHash', (req, res, next) => {
    dbKey = req.header("x-apidb-dbkey");
    tblName = req.params['tableName'];
    idHash = req.params['idHash'];

    if (tblName == null || tblName.length <= 0) {
      return next(
        new server.errors.ForbiddenError("Missing Table Name")
      );
    }
    if (idHash == null || idHash.length <= 0) {
      return next(
        new server.errors.ForbiddenError("Missing Identifier Name")
      );
    }

    __.getDataConnection(dbKey, function (dataConnection) {
      if (!dataConnection) {
        return next(
          new server.errors.ForbiddenError("APIKEY Not Registered")
        );
      }
      recordData = req.body;
      recordData[CONFIG.DB_SPECIAL_COLUMNS.UPDATED_ON] = moment().format("YYYY-MM-DD HH:mm:ss");

      dataConnection.updateData({
        "dbkey": dbKey,
        "table": tblName,
        "idhash": idHash
      }, recordData, function (ans) {
        if (ans._id == null) {
          res.header('content-type', 'json');
          res.send({ "status": false });
        } else {
          res.header('content-type', 'json');
          res.send({ "status": true });
        }
        return next();
      });
    });
  });

  server.del('/:tableName/:idHash', (req, res, next) => {
    dbKey = req.header("x-apidb-dbkey");
    tblName = req.params['tableName'];
    idHash = req.params['idHash'];

    if (tblName == null || tblName.length <= 0) {
      return next(
        new server.errors.ForbiddenError("Missing Table Name")
      );
    }
    if (idHash == null || idHash.length <= 0) {
      return next(
        new server.errors.ForbiddenError("Missing Identifier Name")
      );
    }

    __.getDataConnection(dbKey, function (dataConnection) {
      if (!dataConnection) {
        return next(
          new server.errors.ForbiddenError("APIKEY Not Registered")
        );
      }

      purge = req.params['purge'];
      if (purge == "true") {
        dataConnection.deleteData({
          "dbkey": dbKey,
          "table": tblName,
          "idhash": idHash
        }, function (ans) {
          // if (ans._id == null) {
          //   res.header('content-type', 'json');
          //   res.send({ "status": false });
          // } else {
          //   res.header('content-type', 'json');
          //   res.send({ "status": true });
          // }
          res.header('content-type', 'json');
          res.send({ "status": true });
          return next();
        });
      } else {
        recordData = {};
        recordData[CONFIG.DB_SPECIAL_COLUMNS.UPDATED_ON] = moment().format("YYYY-MM-DD HH:mm:ss");
        recordData[CONFIG.DB_SPECIAL_COLUMNS.DELETED_ON] = moment().format("YYYY-MM-DD HH:mm:ss");
        recordData[CONFIG.DB_SPECIAL_COLUMNS.SOFT_DELETE] = "true";

        dataConnection.updateData({
          "dbkey": dbKey,
          "table": tblName,
          "idhash": idHash
        }, recordData, function (ans) {
          if (ans == null || ans._id == null) {
            res.header('content-type', 'json');
            res.send({ "status": false, "msg": "Record not found" });
          } else {
            res.header('content-type', 'json');
            res.send({ "status": true });
          }
          return next();
        });
      }
    });
  });
}