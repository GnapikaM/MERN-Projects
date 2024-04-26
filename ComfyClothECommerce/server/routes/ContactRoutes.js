import express from "express";
import {
  addContact,
  // deleteContact,
  // fetchAllContacts,
} from "../controller/contactController.js";

const router = express.Router();

// router.route("/get").get(fetchAllContacts);
router.route("/add").post(addContact);
// router.route("/delete/:id").delete(deleteContact);

export default router;
