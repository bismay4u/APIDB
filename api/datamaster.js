/*
 * Data Connection Manager
 * 
 * */

const MONGO = require('./libs/mongo');
const MYSQL = require('./libs/mysql');
// CONST REDIS = require("./libs/redis");

module.exports = {
    CONNECTIONPOOL: {},

    getDataConnection: function (dbKey, callback) {
        if (CONNECTPARAMS[dbKey] == null) return false;
        dataConnection = __.CONNECTIONPOOL[dbKey];
        if (dataConnection == null) {
            switch (CONNECTPARAMS[dbKey].driver) {
                case "mongo":
                    MONGO.connect(CONNECTPARAMS[dbKey], function (con) {
                        __.CONNECTIONPOOL[dbKey] = con;
                        callback(con);
                    });
                    break;
                case "mysql":
                    dataConnection = MYSQL.connect(CONNECTPARAMS[dbKey], function (con) {
                        __.CONNECTIONPOOL[dbKey] = con;
                        callback(con);
                    });
                    break;
                case "sqlite3":

                    break;
                case "redis":

                    break;
                default:
                    return false;
            }

        } else {
            callback(dataConnection);
        }
    },

    getConnectionLength: function () {
        return Object.keys(this.CONNECTIONPOOL).length;
    }
}