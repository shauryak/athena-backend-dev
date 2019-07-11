"use strict";

const assert = require("assert");
const dotenv = require("dotenv");


dotenv.config();

const { PORT,
    HOST,
    HOST_URL,
    SQL_LOCAL_USER,
    SQL_LOCAL_PASSWORD,
    SQL_LOCAL_SERVER,
    SQL_LOCAL_DATABASE,
    SQL_SERVER,
    SQL_DATABASE,
    SQL_USER,
    SQL_PASSWORD,
    NODE_ENV,
    APIAI_TOKEN,
    APIAI_SESSION_ID
} = process.env;



// validate the required configuration information
assert(APIAI_TOKEN, "Token configuration is required.");
assert(APIAI_SESSION_ID, "session configuration is required.");
assert(NODE_ENV, "Environment configuration is required.");
assert(PORT, "PORT configuration is required.");
assert(HOST, "HOST configuration is required.");
assert(HOST_URL, "HOST_URL configuration is required.");
assert(SQL_SERVER, "SQL_SERVER configuration is required.");
assert(SQL_DATABASE, "SQL_DATABASE configuration is required.");
assert(SQL_USER, "SQL_USER configuration is required.");
assert(SQL_PASSWORD, "SQL_PASSWORD configuration is required.");
assert(SQL_LOCAL_SERVER, "SQL_LOCAL_SERVER configuration is required.");
assert(SQL_LOCAL_DATABASE, "SQL_LOCAL_DATABASE configuration is required.");
assert(SQL_LOCAL_USER, "SQL_LOCAL_USER configuration is required.");
assert(SQL_LOCAL_PASSWORD, "SQL_LOCAL_PASSWORD configuration is required.");

// export the configuration information
module.exports = {
    APIAI_TOKEN: APIAI_TOKEN,
    APIAI_SESSION_ID: APIAI_SESSION_ID,
    environment: NODE_ENV,
    port: PORT,
    host: HOST,
    url: HOST_URL,
    localdb: {
        server: SQL_LOCAL_SERVER,
        database: SQL_LOCAL_DATABASE,
        user: SQL_LOCAL_USER,
        password: SQL_LOCAL_PASSWORD,
    },
    serverdb: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
    }
};