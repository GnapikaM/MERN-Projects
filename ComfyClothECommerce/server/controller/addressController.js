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

// export const editAddress = async (req, res) => {
//   try {
//     const address = await AddressModel.findById(req.params.id);
//     if (address === null) {
//       return res.status(404).json({ message: "Address not found" });
//     }
//     if (req.body.userId !== address.userId) {
//       console.log("User ID: ", req.body.userId);
//       console.error("Unauthorized access attempt - User ID mismatch:", req.body.userId, address.userId);
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     address.name = req.body.name;
//     address.phone = req.body.phone;
//     address.street = req.body.street;
//     address.city = req.body.city;
//     address.state = req.body.state;
//     address.zip = req.body.zip;
//     const updatedAddress = await address.save();
//     console.log("Updated Address in controller: ", updatedAddress);
//     res.json(updatedAddress);
//   } catch (error) {
//     console.error("Error editing address:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

// export const editAddress = async (req, res) => {
//   try {
//     const {id} = req.params;
//     const editedAddress = await AddressModel.findByIdAndUpdate(
//       id,
//       req.body,
//       { new: true }
//     );
//     if(!editedAddress) {
//       return res.status(404).json({message: "Address not found"});
//     }
//     res.json(editedAddress);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
