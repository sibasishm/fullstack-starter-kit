"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable node/no-process-env */
var dotenv_1 = require("dotenv");
var dotenv_expand_1 = require("dotenv-expand");
var zod_1 = require("zod");
(0, dotenv_expand_1.expand)((0, dotenv_1.config)());
var EnvSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.string().default("development"),
    PORT: zod_1.z.coerce.number().default(9999),
    LOG_LEVEL: zod_1.z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
    DATABASE_URL: zod_1.z.string().url(),
    DATABASE_AUTH_TOKEN: zod_1.z.string().optional(),
}).superRefine(function (input, ctx) {
    if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.invalid_type,
            expected: "string",
            received: "undefined",
            path: ["DATABASE_AUTH_TOKEN"],
            message: "Must be set when NODE_ENV is 'production'",
        });
    }
});
// eslint-disable-next-line ts/no-redeclare
var _a = EnvSchema.safeParse(process.env), env = _a.data, error = _a.error;
if (error) {
    console.error("❌ Invalid env:");
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
    process.exit(1);
}
exports.default = env;
