import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/UserModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      // wishlist,
      // cart,
    });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "User doesn't exist" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.error("Login Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
