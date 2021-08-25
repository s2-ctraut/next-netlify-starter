// src/index.ts
// MongoDB Server
require("dotenv").config();
import { createLocalServer } from "./server";
// const { createLocalServer } = require("./server");

const port = process.env.PORT || 4000;

const server = createLocalServer();

server.listen(port).then(({ url }) => {
  console.log(`Server ir running at ${url}`);
});
