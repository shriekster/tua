import express from "express";
import {
  createCustomSession,
  broadcast,
  getOnlineUsers,
} from "@/services/sseManager.service";
import { eventEmitter } from "@/services/events.service";

const router = express.Router();

// TODO: add connected users to cache, broadcast the number of online users to admins
router.get("/", async function (req, res) {
  const session = await createCustomSession(req, res, "users");
  const onlineUsers = getOnlineUsers();

  eventEmitter.emit("online_users", onlineUsers);
  // broadcast({ onlineUsers }, "users", "admins");

  session.on("connected", async () => {
    console.log("USER CONNECTED");
    // const onlineUsers = (await getOnlineUsers()) + 1;
    // await setOnlineUsers(onlineUsers);
    // console.log({ newOnlineUsers: onlineUsers });
    // broadcast({ onlineUsers }, "users", "admins");
  });
  session.on("disconnected", async () => {
    console.log("USER DISCONNECTED");
    // const onlineUsers = (await getOnlineUsers()) - 1;
    // await setOnlineUsers(onlineUsers);

    // broadcast({ onlineUsers }, "users", "admins");
    const onlineUsers = getOnlineUsers();

    eventEmitter.emit("online_users", onlineUsers);
  });
  let counter = 0;
  console.debug({ cookies: req.cookies });
  setInterval(() => {
    if (session.isConnected) {
      session.push(counter, "counter", "some-id");
      counter++;
    }
  }, 1000);
});

export default router;
