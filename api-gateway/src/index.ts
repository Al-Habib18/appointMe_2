/** @format */

// import "module-alias/register";
import http from "http";

import app from "./app/app";

// create HTTP Server
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`http://localhost:${PORT}`);
});
