# APIDB Server

API Based Database Gateway Server, used by Logiks and other platforms to setup secure connection to a multitude of database.

Today, the speed of OpenSource Development has increased immensely. Getting drivers for all databases on various languages is becoming difficult with time. So we created this project, which acts as a single point of contact for all database connectivity. Why, NodeJS database drivers are one of the fastest updating libraries.


### Milestones
+ Database Driver Listing to be supported                       Done
+ API Schema Specs                                              Done
+ Base Drive Class                                              
+ API Server                                                    


### Database Supported
+ MongoDB   [WIP]
+ MySQL     [WIP]
+ SQLite    [WIP]
+ PGSQL
+ ElasticSearch
+ Redis
+ CouchDB


### API Schema
GET /fetch/:dbTable                                             List of records from table with pagination
POST /fetch/:dbTable                                            List of records from table with filtering with pagination

GET /fetch/:dbTable/:idHash                                     Details of record

POST /create/:dbTable                                           Create new record

POST /update/:dbTable/:idHash                                   Update a record
PUT /update/:dbTable                                            Update a record

DELETE /delete/:idHash                                          Delete a record


### POST Schema
payload : {
    filter:{},
    query:{},
    columns:[]
},
format : "json"                                                 Format of data json, xml, csv



### Header
x-apidb-dbkey       Database Token, helps setting up enviroment, selecting database, and setting up encryption
x-apidb-token

