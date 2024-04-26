import { ContactModel } from "../model/ContactModel.js";

// export const fetchAllContacts = async (req, res) => {
//   try {
//     const contacts = await ContactModel.find();
//     res.send(contacts);
//   } catch (error) {
//     console.error("Error fetching contacts: ", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const addContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = await ContactModel.create({
      name,
      email,
      subject,
      message,
    });

    await newContact.save();
    res
      .status(201)
      .json({ message: "Contact added Successfully", contact: newContact });
  } catch (error) {
    console.error("Error adding contact: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const deleteContact = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedContact = await ContactModel.findByIdAndDelete(id);

//     if (!deletedContact) {
//       return res.status(404).json({ message: "Contact Not Found" });
//     }
//     res
//       .status(200)
//       .json({
//         message: "Contact deleted successfully",
//         contact: deletedContact,
//       });
//   } catch (error) {
//     console.error("Error deleting contact: ", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
