#!/usr/bin/env node

import http from "node:http";
import "dotenv/config";
import app from "./app";

const port = process.env.PORT || 3001;
app.set("port", port);

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
// server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: unknown) {
  if ((error as any).syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch ((error as any).code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const address = server.address();

  const addressString =
    typeof address === "object"
      ? `${address?.address} ${address?.port}`
      : address.toString();

  console.debug(`Listening on ${addressString}`);
}

// @TODO: graceful shutdown
// @TODO: error event listener
