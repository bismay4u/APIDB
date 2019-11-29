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


### API Schema for Admin
+ GET /														  Basic Server info
+ GET /debug												  Server Debug Information, if DEBUG parameter is on

### API Schema for Data
+ GET /:dbTable                                               List of records from table with pagination
+ POST /:dbTable                                              List of records from table with pagination with filtering
+ GET /:dbTable/:idHash                                       Details of record
+ POST /:dbTable/create                                       Create new record
+ POST /:dbTable/:idHash                                      Update a record
+ PUT /:dbTable/:idHash                                       Update a record
+ DEL /:dbTable/:idHash                                       Delete a record Soft
+ DEL /:dbTable/:idHash?purge=true                            Delete a record Permanenet

### GET Params
+ page                                                        Pagination index while listing, default 0
+ limit                                                       Limit records while listing, default 20
+ skip                                                        Skip records while listing, default 0
+ purge                                                       To be used with delete for permananet deletion
+ columns                                                     Which columns to view
+ orderby                                                     To setup ordering direction and column, eg. title DESC

### POST Schema
+ columns                                                     Which columns to view
+ orderby                                                     To setup ordering direction and column, eg. title DESC
+ filter                                                      JSON Object structure, eg ```{"title":"Group Head", "age":[20,"GT"], "type":"staff"}```
+ query                                                       To search for data using full text search in all columns


### More
+ format : "json"                                             Format of data json, xml, csv



### Header
+ x-apidb-dbkey       Database Token, helps setting up enviroment, selecting database, and setting up encryption
+ x-apidb-token       Access privilege token



