"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var postgres_js_1 = require("drizzle-orm/postgres-js");
var postgres_1 = require("postgres");
var env_1 = require("./env");
var queryClient = (0, postgres_1.default)(env_1.default.DATABASE_URL);
var db = (0, postgres_js_1.drizzle)(queryClient);
var result = await db.execute("select 1");
console.log(result);
