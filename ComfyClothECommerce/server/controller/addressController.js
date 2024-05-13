import { AddressModel } from "../model/AddressModel.js";

export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await AddressModel.find({ userId: req.params.userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewAddress = async (req, res) => {
  const address = new AddressModel({
    userId: req.body.userId,
    name: req.body.name,
    phone: req.body.phone,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  });

  try {
    const newAddress = await address.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    await AddressModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editAddress = async (req, res) => {
  try {
    const updatedAddress = await AddressModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};