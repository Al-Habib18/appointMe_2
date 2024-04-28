/** @format */

import "module-alias/register";
import http from "http";

import config from "config";
import app from "@app/app";

// create HTTP Server
const server = http.createServer(app);

const PORT = config.get("port");
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`http://localhost:${PORT}`);
});
