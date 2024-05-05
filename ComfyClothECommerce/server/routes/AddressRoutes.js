import express from "express";
import { addNewAddress, getAllAddresses, deleteAddress, editAddress } from "../controller/addressController.js";

const router = express.Router();

router.route("/:userId").get(getAllAddresses);
router.route("/").post(addNewAddress);
router.route("/:id").delete(deleteAddress);
router.route("/:id").put(editAddress);

export default router;