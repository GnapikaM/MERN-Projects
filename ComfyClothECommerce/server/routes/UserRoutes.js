import express from "express";

import { login, register, fetchUsers, deleteAccount } from "../controller/userController.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/").get(fetchUsers);
router.route("/delete/:userId").delete(deleteAccount);

export default router;
