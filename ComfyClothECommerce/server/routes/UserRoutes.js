import express from "express";

import { login, register, fetchUsers } from "../controller/userController.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/").get(fetchUsers);

export default router;
