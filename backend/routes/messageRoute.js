import express from "express";
import { sendMessage,getMessages } from "../controller/messageController.js";
import isAuthenticated from "../middleware/IsAuthnticated.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated,sendMessage); // aa route ma id pass kari ne receiver nu id pass kari ne message send kari saku ane parama ma id pass kari ne receiver nu id pass kari ne message send kari saku

router.route("/get/:id").get(isAuthenticated,getMessages);

export default router;