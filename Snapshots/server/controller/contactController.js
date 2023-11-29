import { ContactModel } from "../model/ContactModel.js"

export const contact = async (req, res) => {
    const { name, email, message } = req.body;
    try {
      const contactUsEntry = new ContactModel({
        name,
        email,
        message,
      });
  
      await contactUsEntry.save();
      console.log("Contact us Entry: ", contactUsEntry);
  
      res.status(201).json({ message: "Form submitted successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  