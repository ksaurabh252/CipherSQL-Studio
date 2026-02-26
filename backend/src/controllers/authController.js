const User = require("../models/user.model");

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Simple check
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: "User created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
      res.json({ message: "Login Success", user: user.username });
    } else {
      res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { signup, login };
