# APIDB Server

API Based Database Gateway Server, used by Logiks and other platforms to setup secure connection to a multitude of database.

Today, the speed of OpenSource Development has increased immensely. Getting drivers for all databases on various languages is becoming difficult with time. So we created this project, which acts as a single point of contact for all database connectivity. Why, NodeJS database drivers are one of the fastest updating libraries.


### Milestones
+ API Schema Specs
+ API Server
+ Database Driver Listing


### Database Supported
+ MongoDB   [WIP]
+ MySQL     [WIP]
+ PGSQL
+ ElasticSearch
+ Redis
+ CouchDB


### API Schema
GET /fetch/:dbTable/:idHash
POST /fetch/:dbTable

POST /create/:dbTable

POST /update/:dbTable/:idHash
PUT /update/:dbTable

DELETE /delete/:idHash



### Header
x-apidb-token       Database Token, helps setting up enviroment, selecting database, and setting up encryption
