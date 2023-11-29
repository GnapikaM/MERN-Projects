import express from "express";

import { contact } from "../controller/contactController.js";

const router = express.Router();

router.route('/').post(contact);

export default router;