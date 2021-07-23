"use strict";
import assert from "assert";
import dotenv from "dotenv";

dotenv.config();

const { PORT, HOST, HOST_URL, MONGOATLAS_KEY, SERP_API } = process.env;

assert(PORT, "PORT is required");
assert(HOST, "HOST is required");

export default {
  port: PORT,
  host: HOST,
  host_url: HOST_URL,
  mongoDBKey: MONGOATLAS_KEY,
  serp_api: SERP_API,
};
