const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

require("../db/connection");
const User = require("../model/schema");

const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({
      error: "field cannot be empty",
    });
  }

  //using promises

  // User.findOne({ email: email })
  //   .then((userExist) => {
  //     if (userExist) {
  //       return res.status(422).json({
  //         error: "User already exists",
  //       });
  //     }
  //     const user = new User({ name, email, phone, password, cpassword });

  //     user
  //       .save()
  //       .then(() => {
  //         res.status(201).json({ message: "successfully registered user" });
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ error: "Failed to registered" });
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  //using async

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({
        error: "User already exists",
      });
    } else if (password != cpassword) {
      return res.status(422).json({
        error: "passwords donot match",
      });
    }
    const user = new User({ name, email, phone, password, cpassword });

    const register = await user.save();
    if (register) {
      res.status(201).json({ message: "successfully registered user" });
    }
  } catch (error) {
    console.log(error);
  }
});

// login route

router.post("/signin", async (req, res) => {
  let token;

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ error: "fields cannot be empty" });
    }

    const userlogin = await User.findOne({ email: email }); //method of mongoose

    if (userlogin) {
      const matched = await bcrypt.compare(password, userlogin.password);
      token = await userlogin.generateAuthToken();

      console.log("login successful");

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!matched) {
        res.status(400).json({ error: "invalid credentials" });
      } else {
        res.json({ message: "signin successful" });
      }
    } else {
      res.status(400).json({ error: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/aboutme", authenticate, (req, res) => {
  console.log(`about`);
  res.send(req.rootUser);
});

router.get("/getdata", authenticate, (req, res) => {
  console.log(`data`);
  res.send(req.rootUser);
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.json({ error: "fill contract form" });
    }

    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMsg = await userContact.addmessage(name, email, phone, message);
      await userContact.save();
      res.status(201).json({ message: "user contact successful" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/logout", authenticate, (req, res) => {
  console.log(`logout`);
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send(`logged out successful`);
});
module.exports = router;
