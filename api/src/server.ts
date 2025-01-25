#!/usr/bin/env node
import http from "node:http";
import "dotenv/config";
import { runMigrations, seed } from "@/services/db.service";
import app from "./app";

const handleServerListening = () => {
  const address = server.address();

  const addressString =
    typeof address === "object"
      ? `${address?.address}->${address?.port}`
      : address.toString();

  console.log(`TUA API server listening on ${addressString}`);
};

const handleServerError = (error: Error) => {
  console.error("Server error: ", error);
};

const handleProcessSignal = (signal: NodeJS.Signals) => {
  console.log(`\nReceived ${signal}, closing server...`);

  try {
    server.closeAllConnections();
  } catch (error) {
    console.error("🚨", error);
    process.exit(1);
  }

  console.log("Bye 👋");
  process.exit(0);
};

["SIGTSTP", "SIGINT", "SIGTERM"].map((signal) => {
  process.on(signal, handleProcessSignal);
});

const port = process.env.PORT || 3001;
app.set("port", port);

await runMigrations();
await seed();

const server = http.createServer(app);
server.listen(port);
server.on("error", handleServerError);
server.on("listening", handleServerListening);
