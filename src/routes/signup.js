const router = require("express").Router();
const User = require("../../models/schemaUser");

router.get("/signup", (req, res) => {
  res.render("./signup/signup.ejs");
});

router.post("/signup", async (req, res) => {
  try {
    const entry = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };
    const user = await User.find(entry);
    console.log(user)
    if (!user.length) {
      req.session.user = user;
      await User.create(entry);
      res.send("Registered Successfully.");
    } else {
      return res.render("./login/login.ejs", {
        message: "User Already Exists",
      });
    }
  } catch (error) {
    console.error("Error occurred during signup:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
